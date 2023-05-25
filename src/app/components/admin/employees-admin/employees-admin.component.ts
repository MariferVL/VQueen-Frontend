import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../types';

@Component({
  selector: 'app-employees-admin',
  templateUrl: './employees-admin.component.html',
  styleUrls: ['./employees-admin.component.css']
})
export class EmployeesAdminComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  employees: User[] = [];
  private subscription: Subscription = new Subscription;

  constructor(
    private titleService: Title,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQAdmin - Employee Data');
    this.subscription = this.adminService.getUsers()
      .subscribe(employees => {
        this.employees = employees;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onDeleteClicked(employeeId: number): void {
    this.adminService.deleteUser(employeeId)
      .subscribe(() => {
        this.employees = this.employees.filter(employee => employee.id !== employeeId);
      });
  }
}
