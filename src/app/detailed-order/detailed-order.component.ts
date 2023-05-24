import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { UsernameModalComponent } from '../username-modal/username-modal.component';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { Product } from '../types';
import { AdminService } from '../services/admin.service';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-detailed-order',
  templateUrl: './detailed-order.component.html',
  styleUrls: ['./detailed-order.component.css']
})


export class DetailedOrderComponent implements OnInit {
  isLoading: boolean = true;
  customerName: string = '';
  message: string = '';
  menu: Product | undefined;
  orderDate: string = '';
  orderNum: string = '';
  status: string= '';
  selectedProducts: Product[] = [];

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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getMenusById(id)
    .subscribe(menu => {
      this.menu = menu;
      this.isLoading = false;
    })
    this.checkCustomerName();
    this.selectedProducts = this.orderService.getSelectedProducts();
  }

  checkCustomerName(): void {
    console.log('entró a checkCustomerName');

    const storedName = localStorage.getItem('customerName');
    if (storedName) {
      console.log('entró a if');
      
      this.customerName = storedName;
    } else {
      console.log('entró a else');

      this.openModal();
    }
  }

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
  
  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1); // Remove the selected product from the array
  }

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
        console.log('msg: ', this.message);
        console.log('this.customerName: ', this.customerName);
        console.log('this.selectedProducts: ', this.selectedProducts);
        console.log('this.status: ', this.status);
        console.log('this.orderDate: ', this.orderDate);      

        // Send the selected products to the admin.service for posting the orders
        this.orderService.addOrder(this.customerName,this.selectedProducts, this.status, this.orderDate).subscribe(() => {
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
  
  
    /**
     * Helper function that pads single-digit numbers with a leading zero,
     * ensuring consistent formatting.
     * @param num 
     * @returns string
     */
    private padZero(num: number): string {
      return num < 10 ? `0${num}` : num.toString();
    }

}

  //TODO: Show this message while the food is being cooked.
  // alert('🍽️ **Exciting News! Your Food Order is Being Prepared!** 🎉 \n Your order is in safe hands! Our skilled team is meticulously selecting the freshest ingredients to craft your culinary masterpiece. 🌱🥦🍅 \nBehind the scenes, our talented chefs are passionately curating a symphony of flavors, ensuring that every bite exceeds your expectations. 🍽️✨\nGet ready to embark on a sensational gastronomic journey, where taste and quality unite to create an unforgettable dining experience. Bon appétit! 😊🍴')





