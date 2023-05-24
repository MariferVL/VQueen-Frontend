import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../../../services/admin.service';
import { Product } from '../../../types';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {
  isLoading: boolean = true;
  menus: Product[] = [];

  constructor(
    private titleService: Title,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('VQAdmin - Menu Data');
    this.adminService.getMenus()
      .subscribe(menus => {
        this.menus = menus;
        this.isLoading = false;
      })
  }

  onDeleteClicked(menuId: number): void {
    this.adminService.deleteMenu(menuId)
      .subscribe(() => {
        this.menus = this.menus.filter( menu => menu.id !== menuId)
      })
  }
}
