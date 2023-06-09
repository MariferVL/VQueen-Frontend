import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { UsernameModalComponent } from '../../modals/username-modal/username-modal.component';
import { OrderModalComponent } from '../../modals/order-modal/order-modal.component';
import { Product, ProductWithQty } from '../../../interfaces/types';
import { AdminService } from '../../../services/admin.service';
import { OrderService } from '../../../services/order.service';


@Component({
  selector: 'app-detailed-order',
  templateUrl: './detailed-order.component.html',
  styleUrls: ['./detailed-order.component.css']
})


export class DetailedOrderComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  customerName: string = '';
  message: string = '';
  menu: Product | undefined;
  orderDate: string = '';
  orderNum: string = '';
  status: string = '';
  selectedProducts: ProductWithQty[] = [];
  private subscription: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private titleService: Title,
    private adminService: AdminService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQ - Order Detail');
    this.checkCustomerName();
    this.selectedProducts = this.orderService.getSelectedProducts();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * 
   */
  openModal(): void {
    const dialogRef: MatDialogRef<UsernameModalComponent> = this.dialog.open(UsernameModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.customerName = result;
        localStorage.setItem('customerName', this.customerName);
      }
    });
  }

  /**
   * 
   */
  checkCustomerName(): void {
    const storedName = localStorage.getItem('customerName');
    if (storedName) {
      this.customerName = storedName;

    } else {
      this.openModal();
    }
  }

  /**
   * Increase the quantity of the product at the specified index
   * in the selectedProducts array by 1.
   * @param index 
   */
  increaseQty(index: number): void {
    this.selectedProducts[index].qty += 1;
  }

  /**
   * Check if the quantity of the product is greater than
   * 1 before decrementing it by 1
   * @param index 
   */
  decreaseQty(index: number): void {
    if (this.selectedProducts[index].qty > 1) {
      this.selectedProducts[index].qty -= 1;
    }
  }


  /**
   * Remove product from the order detail.
   * @param index 
   */
  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1); // Remove the selected product from the array
  }

  

  /**
   * 
   * @returns string
   */
  generateOrderNumber(): string {
    const timestamp = new Date().getTime();
    return `VQ${timestamp}`;
  }

  /**
   * Helper function that pads single-digit numbers with a leading zero,
   * ensuring consistent formatting.
   * @param num 
   * @returns string
   */
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  /**
 *  Creates a new Date object representing the current date and time.
 * @returns string
 */
  getCurrentDateTime(): string {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = this.padZero(currentDate.getMonth() + 1);
    const day = this.padZero(currentDate.getDate());
    const hour = this.padZero(currentDate.getHours());
    const minute = this.padZero(currentDate.getMinutes());
    const second = this.padZero(currentDate.getSeconds());

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  calculateTotal(): number {
    let total = 0;
    for (const product of this.selectedProducts) {
      total += product.price * product.qty;
    }
    return total;
  }

  calculateTip(total: number, tipPercentage: number): number {
    return total * (tipPercentage / 100);
    
  }

  /**
   * Display the confirmation modal and if the order is confirmed it post it.
   */
  confirmOrder(): void {
    const confirmRef = this.dialog.open(OrderModalComponent, {
      width: '1100px',
      data: { products: this.selectedProducts },
    });

    confirmRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.orderNum = this.generateOrderNumber();
        this.orderDate = this.getCurrentDateTime();
        this.status = 'sent';
        this.message = `Order ${this.orderNum} from ${this.customerName}`;

        console.log('msg: ', this.message);
        console.log('this.customerName: ', this.customerName);
        console.log('this.selectedProducts: ', this.selectedProducts);
        console.log('this.status: ', this.status);
        console.log('this.orderDate: ', this.orderDate);

        // Send the selected products to the admin.service for posting the orders
        this.orderService.addOrder(this.customerName, this.selectedProducts, this.status, this.orderDate, this.orderNum).subscribe(() => {
          console.log('Orders posted successfully');
          this.orderService.clearOrder();
          this.router.navigateByUrl('/order-received');
        });
      }
    });
  }

  /**
   * Cancel the order and delete the data when the user clicks the option.
   */
  cancelOrder() {
    this.orderService.clearOrder();
    this.router.navigateByUrl('/home');
  }


}





