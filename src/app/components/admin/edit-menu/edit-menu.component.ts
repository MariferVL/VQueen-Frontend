import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../types';
import { AdminService } from '../../../services/admin.service';

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
    private adminService: AdminService,
  ) { }

  
  ngOnInit(): void  {
    this.titleService.setTitle('VQAdmin - Edit Menu');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getMenusById(id)
      .subscribe(menu => this.menu = menu);
  }

  onSubmit({ name, price, image, type }:{ name: string, price: number, image: string, type: string }): void {
    if (this.menu) {
      console.log('menu: ', this.menu.name, this.menu.price);

      this.adminService.editMenu(this.menu.id, name, price, image, type, this.menu.
        dateEntry)
        .subscribe(() => {
          console.log('Saving changes');  
          //TODO: PREGUNTA: Esto es apropiado? Porque funciona😅       
          window.location.href = '/admin/menu';
        });
    }
  }
}
