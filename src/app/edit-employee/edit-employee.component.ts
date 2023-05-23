import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../types';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})

export class EditEmployeeComponent implements OnInit{
  employee: User | undefined
    
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private adminService: AdminService,
  ) { }


  ngOnInit(): void {
    this.titleService.setTitle('VQAdmin - Edit Employees Data');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adminService.getEmployeesById(id)
      .subscribe(employee => this.employee = employee);
  }

  onSubmit({  email, password, role }: { email: string, password:string, role:string }): void {
    if (this.employee) {
      console.log('employee: ', this.employee.email, this.employee.role);

      this.adminService.editEmployee(this.employee.id, email, password, role)
        .subscribe(() => {
          console.log('Saving changes');
          //TODO: PREGUNTA: Esto es apropiado? Porque funciona😅       
          window.location.href = '/admin/employee';
        });
    }
  }


}
