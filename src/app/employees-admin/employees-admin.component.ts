import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { User } from '../types';

@Component({
  selector: 'app-employees-admin',
  templateUrl: './employees-admin.component.html',
  styleUrls: ['./employees-admin.component.css']
})
export class EmployeesAdminComponent {

  isLoading: boolean = true;
  employees: User[] = [];

  constructor(
    private titleService: Title,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('VQAdmin - Employee Data');
    this.adminService.getUsers()
      .subscribe(employees => {
        this.employees = employees;
        this.isLoading = false;
      })
  }

  onDeleteClicked(employeeId: number): void {
    this.adminService.deleteUser(employeeId)
      .subscribe(() => {
        this.employees = this.employees.filter( employee => employee.id !== employeeId)
      })
  }
}
