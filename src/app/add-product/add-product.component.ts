import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    private titleService: Title,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQAdmin - Add Product');
  }

  onSubmit({ id, name, price, image, type, dateEntry }:
    { id: number, name: string, price: number, image: string, type: string, dateEntry: string }): void {
    this.adminService.createMenu(id, name, price, image, type, dateEntry )
      .subscribe(() => {
        window.location.href = '/admin/menu';
        console.log('Creating a new delicacy.👑');
      });
  }


}

