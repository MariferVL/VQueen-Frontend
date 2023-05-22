import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(
    private titleService: Title,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQAdmin - Add Product');
  }

  onSubmit({ name, price, image }:
    { name: string, price: number, image: string }): void {
    this.adminService.createMenu(name, price, image)
      .subscribe(() => {
        window.location.href = '/admin/menu';
        console.log('Creating a new delicacy.👑');
      });
  }


}

