import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { Product } from '../../../types';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  menus: Product[] = [];
  private subscription: Subscription = new Subscription;

  constructor(
    private titleService: Title,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQAdmin - Menu Data');
    this.subscription = this.adminService.getMenus()
      .subscribe(menus => {
        this.menus = menus;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onDeleteClicked(menuId: number): void {
    this.adminService.deleteMenu(menuId)
      .subscribe(() => {
        this.menus = this.menus.filter(menu => menu.id !== menuId);
      });
  }
}
