import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from '../../../interfaces/types';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  menu: Product | undefined;
  currentUrl: string = '';

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    public router: Router,
    private adminService: AdminService,
  ) { }

  
  ngOnInit(): void  {
    this.titleService.setTitle('VQAdmin - Edit Menu');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getMenusById(id)
      .subscribe(menu => this.menu = menu);
    
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url
      }
    })
  }

  onSubmit({ name, price, image, type }:{ name: string, price: number, image: string, type: string }): void {
    if (this.menu) {

      this.adminService.editMenu(this.menu.id, name, price, image, type, this.menu.
        dateEntry)
        .subscribe(() => {
          this.router.navigateByUrl('/menu');
        });
    }
  }
}
