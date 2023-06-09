import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Product } from '../../../interfaces/types';
import { AdminService } from '../../../services/admin.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  appetizers: Product[] = [];
  mainCourses: Product[] = [];
  desserts: Product[] = [];
  beverages: Product[] = [];
  private subscription: Subscription = new Subscription;

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('VQ - Menu');
    this.subscription = this.adminService.getMenus()
      .subscribe(menus => {
        this.appetizers = menus.filter(menu => menu.type === 'Appetizers');
        this.mainCourses = menus.filter(menu => menu.type === 'Main Course');
        this.desserts = menus.filter(menu => menu.type === 'Desserts' );
        this.beverages = menus.filter(menu => menu.type === 'Beverages');
        this.isLoading = false;
      });
  }

  selectProduct(product: Product): void {
    this.orderService.addSelectedProduct(product);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
