import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Product } from '../../../types';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  menus: Product[] = [];
  private subscription: Subscription = new Subscription;

  constructor(
    private titleService: Title,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('VQ - Menu');
    this.subscription = this.adminService.getMenus()
      .subscribe(menus => {
        this.menus = menus;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
