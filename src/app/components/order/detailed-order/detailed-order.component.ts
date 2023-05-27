import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { UsernameModalComponent } from '../../modals/username-modal/username-modal.component';
import { OrderModalComponent } from '../../modals/order-modal/order-modal.component';
import { Product, ProductWithQuantity } from '../../../types';
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
  selectedProducts: ProductWithQuantity[] = [];   
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
      console.log('entró a if');

      this.customerName = storedName;
      console.log('this.customerName: ', this.customerName);

    } else {
      console.log('entró a else');

      this.openModal();
    }
  }

  /**
   * Increase the quantity of the product at the specified index
   * in the selectedProducts array by 1.
   * @param index 
   */
  increaseQuantity(index: number): void {
    this.selectedProducts[index].quantity += 1;
  }

  /**
   * Check if the quantity of the product is greater than
   * 1 before decrementing it by 1
   * @param index 
   */
  decreaseQuantity(index: number): void {
    if (this.selectedProducts[index].quantity > 1) {
      this.selectedProducts[index].quantity -= 1;
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
 * Display the confirmation modal and if the order is confirmed it post it.
 */
  confirmOrder(): void {
    const confirmRef = this.dialog.open(OrderModalComponent, {
      width: '1100px',
      data: this.selectedProducts, // Pass the selected products to the OrderModalComponent
    });

    //TODO: Pendiente adaptar html para llamar metodo
    confirmRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.orderNum = this.generateOrderNumber();
        this.orderDate = this.getCurrentDateTime();
        this.status = 'sended';
        this.message = `Order ${this.orderNum} from ${this.customerName}`;
        //TODO: Add order
        console.log('msg: ', this.message);
        console.log('this.customerName: ', this.customerName);
        console.log('this.selectedProducts: ', this.selectedProducts);
        console.log('this.status: ', this.status);
        console.log('this.orderDate: ', this.orderDate);

        // Send the selected products to the admin.service for posting the orders
        this.orderService.addOrder(this.customerName, this.selectedProducts, this.status, this.orderDate).subscribe(() => {
          console.log('Orders posted successfully');
          this.router.navigateByUrl('/order-received');
        });
      }
    });
  }

  generateOrderNumber(): string {
    const timestamp = new Date().getTime();
    return `#VQ${timestamp}`;
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
      total += product.price * product.quantity;
    }
    return total;
  }

  calculateTip(total: number, tipPercentage: number): number {
    return total * (tipPercentage / 100);
  }
}

  //TODO: Show this message while the food is being cooked.
  // alert('🍽️ **Exciting News! Your Food Order is Being Prepared!** 🎉 \n Your order is in safe hands! Our skilled team is meticulously selecting the freshest ingredients to craft your culinary masterpiece. 🌱🥦🍅 \nBehind the scenes, our talented chefs are passionately curating a symphony of flavors, ensuring that every bite exceeds your expectations. 🍽️✨\nGet ready to embark on a sensational gastronomic journey, where taste and quality unite to create an unforgettable dining experience. Bon appétit! 😊🍴')





