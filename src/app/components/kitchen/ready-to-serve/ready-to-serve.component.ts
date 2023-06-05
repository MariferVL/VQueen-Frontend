import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/types';

@Component({
  selector: 'app-ready-to-serve',
  templateUrl: './ready-to-serve.component.html',
  styleUrls: ['./ready-to-serve.component.css']
})
export class ReadyToServeComponent implements OnInit {
  orders: Order[] = [];
  cookingOrders: Order[] = [];
  readyOrders: Order[] = [];

  constructor(
    private titleService: Title,
    private orderService: OrderService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('VQ - Ready!');
    this.fetchOrders();

    setInterval(() => {
      this.fetchOrders();
    }, 30000);
  }

  fetchOrders() {
    this.orderService.getOrders().subscribe({
      next: (response: Order[]) => {
        this.orders = response;
        this.filterByStatus();
      },
      error: (error) => {
        console.log('Error fetching orders:', error);
      },
      complete: () => {
        console.log('Get orders request completed');
      }
    });
  }

  /**
  * Sort orders by dateEntry in ascending order
  * @returns array sorted
  */
  sortByDate() {
    return this.orders.sort((a, b) => new Date(a.dateProcessed).getTime() - new Date(b.dateProcessed).getTime());
  }

  /**
  * Filter orders to include only those with status 'sent' or 'cooking'.
  */
  filterByStatus() {
    this.sortByDate();
    this.cookingOrders = this.orders.filter(order => order.status === 'cooking');
    this.readyOrders = this.orders.filter(order => order.status === 'ready');
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


  markAsDelivered(order: Order){
    order.status = 'delivered';
    order.dateProcessed = this.getCurrentDateTime();
    this.orderService.editOrder(order.id, order.status, order.dateProcessed).subscribe({
      next: (response: Order) => {
      },
      error: (error) => {
        console.error('Error: ', error);
      }
    });
    this.fetchOrders();

  }


  /**
   * Remove the served order from the readyOrders array
   * @param order 
   */
  serveOrder(order: Order) {
    const index = this.readyOrders.indexOf(order);
    if (index !== -1) {
      this.readyOrders.splice(index, 1);
    }
  }
}
