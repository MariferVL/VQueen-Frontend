import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { Product } from '../../../interfaces/types';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  menus: Product[] = [];
  filteredMenus: Product[] = [];
  selectedMenuType: string | null = null;
  faArrowLeft = faArrowLeft;
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
        this.filteredMenus = this.menus;
        this.isLoading = false;
      });
  }

  filterMenus(menuType: string): void {
    this.selectedMenuType = menuType;
    if (menuType === 'All') {
      this.filteredMenus = this.menus;
    } else {
      this.filteredMenus = this.menus.filter(menu => menu.type === menuType);
    }
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
