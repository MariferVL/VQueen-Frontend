import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{

  constructor(
    private titleService: Title,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQAdmin - Add Member');
  }

  onSubmit({ id, email, password, role }:
    { id: number, email: string,  password: string, role: string }): void {
    this.adminService.addEmployee(id, email, password, role)
      .subscribe(() => {
        window.location.href = '/admin/menu';
        console.log('Adding a new member.👑');
      });
  }


}
