import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../types';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  menu: Product | undefined;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
  ) { }

  /**
   * Lifecycle hook to fetch the menu details. 
   * Ensures that the component has finished initializing and 
   * the view is rendered before making the API call.
   */
  ngOnInit(): void  {
    this.titleService.setTitle('VQAdmin - Edit Menu');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getMenusById(id)
      .subscribe(menu => this.menu = menu);
  }

  onSubmit({ name, price, image }:{ name: string, price: number, image: string }): void {
    if (this.menu) {
      console.log('menu: ', this.menu.name, this.menu.price);

      this.adminService.editMenu(this.menu.id, name, price, image)
        .subscribe(() => {
          console.log('Saving changes');  
          //TODO: PREGUNTA: Esto es apropiado? Porque funciona😅       
          window.location.href = '/admin/menu';
        });
    }
  }
}
