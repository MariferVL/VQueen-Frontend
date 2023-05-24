import { Component, OnInit } from '@angular/core';
import { Product } from '../../../types';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  isLoading: boolean = true;
  menus: Product[] = [];

  constructor(
    private titleService: Title,
    private AdminService: AdminService,
    ) {}

  ngOnInit() {
    this.titleService.setTitle('VQ - Menu');
    this.AdminService.getMenus()
    .subscribe(menus => {
      this.menus = menus;
      this.isLoading = false;
    });
  }
}