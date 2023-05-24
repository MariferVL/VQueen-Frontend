import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { OrderService } from '../services/order.service';
import { Product } from '../types';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detailed-menu',
  templateUrl: './detailed-menu.component.html',
  styleUrls: ['./detailed-menu.component.css']
})
export class DetailedMenuComponent implements OnInit {
  isLoading: boolean = true;
  menu: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    type: '',
    dateEntry: ''
  }; 
  foodImg: string = 'assets/Images/';


  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private orderService: OrderService,
    private titleService: Title,
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQ - Add Product');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.adminService.getMenusById(id)
    .subscribe(menu => {
      this.menu = menu;
      this.foodImg += this.menu.image;
      this.isLoading = false;
    });
  
  }

  selectProduct(product: Product): void {
    this.orderService.addSelectedProduct(product);
  }

}
