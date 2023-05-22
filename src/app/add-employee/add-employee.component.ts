import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  constructor(
    private titleService: Title,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQAdmin - Add Employee');
  }

  onSubmit({ name, price, image }:
    { name: string, price: number, image: string }): void {
    this.adminService.createMenu(name, price, image)
      .subscribe(() => {
        window.location.href = '/admin/menu';
        console.log('Adding a new member.👑');
      });
  }


}
