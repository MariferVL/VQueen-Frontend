import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { Product } from '../../../interfaces/types';
import { MenuModalComponent } from '../../modals/menu-modal/menu-modal.component';

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
  
  subscription: Subscription = new Subscription;

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    public dialog: MatDialog,

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

  onSubmit(): void {
    const addMenuRef: MatDialogRef<MenuModalComponent> =  this.dialog.open(MenuModalComponent, {
      width: '800px',
      data: { menus: this.menus },
    });

    addMenuRef.afterClosed().subscribe((data) => {
      if (data) {
        this.subscription = this.adminService.createMenu(data[0], data[1], data[2], data[3], data[4], data[5]).subscribe(() => {
          console.log('Adding a new member.👑');
          console.log(data[0], data[1], data[2], data[3], data[4], data[5]);
          this.menus.push({ id: data[0],name: data[1],price: data[2],image: data[3],type: data[4],dateEntry: data[5] });
          this.filteredMenus = this.menus;

        });
      }
    });
  }


  onDeleteClicked(menuId: number): void {
    this.adminService.deleteMenu(menuId)
      .subscribe(() => {
        this.menus = this.menus.filter(menu => menu.id !== menuId);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
