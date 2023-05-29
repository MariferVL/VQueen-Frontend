import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/types';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  orders: Order[] = [];
  waitingOrdersCount: number = 0;
  userRole: string = '';
  private subscription: Subscription | undefined;


  constructor(
    private titleService: Title,
    private orderService: OrderService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,

  ) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.authService.accessToken = token;
    }
  }

  ngOnInit() {
    this.titleService.setTitle('VQ - Royal Kitchen');

    setTimeout(() => {
      this.authService.getUserRole().subscribe((userRole: string) => {
        this.userRole = userRole;
        console.log('Chef this.userRole: ', this.userRole);

        this.cdr.detectChanges();
  
        this.getOrders();
      });
    });

    // Update waiting orders count every minute
    setInterval(() => {
      this.updateWaitingOrdersCount();
    }, 60000); 
  }


  get isLoggedIn(): boolean {
    return !!this.authService.accessToken;
  }


  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (response: Order[]) => {
        this.orders = response;
        this.orders.forEach((order) => console.log(order));
        this.updateWaitingOrdersCount();
      },
      error: (error) => {
        console.log('Error fetching orders:', error);
      },
      complete: () => {
        console.log('Get orders request completed');
      }
    });
  }
  

  updateWaitingOrdersCount() {
    this.waitingOrdersCount = this.orders.filter(order => order.status === 'sent').length;
  }

  editOrderStatus(order: Order) {
    if (order.status === 'sent') {
      order.status = 'cooking';
      order.dateProcessed = this.getCurrentDateTime();
      this.orderService.editOrder(order.status, this.getCurrentDateTime());
    } else if (order.status === 'cooking') {
      order.status = 'ready';
      order.dateProcessed = this.getCurrentDateTime();
      this.orderService.editOrder(order.status, this.getCurrentDateTime());
      this.updateWaitingOrdersCount();
    }

  }

  getCurrentDateTime(): string {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())}`;
    const formattedTime = `${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}`;
    return `${formattedDate} ${formattedTime}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  calculateTimeDifference(entryDate: string): number {
    const entryDateTime = new Date(entryDate);
    const currentTime = new Date();
    const timeDifference = Math.abs(currentTime.getTime() - entryDateTime.getTime());
    return Math.floor(timeDifference / 60000); // Convert milliseconds to minutes
  }

  getOrderColor(entryDate: string, status: string): string {
    const minutesPassed = this.calculateTimeDifference(entryDate);
    if (status === 'sent' && minutesPassed >= 1) {
      return 'taking-more-than-usual';
    } else if (status === 'sent' && minutesPassed >= 2) {
      return 'taking-too-long';
    } else if (status === 'sent') {
      return 'cooking-button';
    } else if (status === 'cooking') {
      return 'ready-button';
    }  else {
      return 'received-button';
    }
  }


  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
