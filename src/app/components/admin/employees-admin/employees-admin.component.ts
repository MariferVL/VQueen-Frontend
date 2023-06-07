import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { AdminService } from '../../../services/admin.service';
import { User } from '../../../interfaces/types';
import { EmployeeModalComponent } from '../../modals/employee-modal/employee-modal.component';

@Component({
  selector: 'app-employees-admin',
  templateUrl: './employees-admin.component.html',
  styleUrls: ['./employees-admin.component.css']
})
export class EmployeesAdminComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  employees: User[] = [];
  filteredEmployees: User[] = [];
  selectedRole: string | null = null;
  faArrowLeft = faArrowLeft;
  subscription: Subscription = new Subscription;

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQAdmin - Employee Data');
    this.subscription = this.adminService.getUsers()
      .subscribe(employees => {
        this.employees = employees;
        this.isLoading = false;
        this.filteredEmployees = this.employees; 
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterEmployees(role: string): void {
    if (role === 'all') {
      this.filteredEmployees = this.employees; 
    } else {
      this.filteredEmployees = this.employees.filter(employee => employee.role === role); 
    }
  }

  onDeleteClicked(employeeId: number): void {
    this.adminService.deleteUser(employeeId)
      .subscribe(() => {
        this.employees = this.employees.filter(employee => employee.id !== employeeId);
        this.filteredEmployees = this.filteredEmployees.filter(employee => employee.id !== employeeId);
      });
  }

  onSubmit(): void {
    const addEmployeeRef: MatDialogRef<EmployeeModalComponent> =  this.dialog.open(EmployeeModalComponent, {
      width: '800px',
      data: { employees: this.employees },
    });

    addEmployeeRef.afterClosed().subscribe((data) => {
      if (data) {
        this.subscription = this.adminService.addUser(data[0], data[1], data[2], data[3]).subscribe(() => {
          this.employees.push({ id: data[0], email: data[1], password: data[2], role: data[3] });
          this.filteredEmployees = this.employees; 
        });
      }
    });
  }
}
