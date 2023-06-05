import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/types';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent {
  employees: User[] = [];

  constructor(
    public addEmployeeRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employees: User[] }
  ) {
    this.employees = data.employees;
  }

  submitForm({ id, email, password, role }:
    { id: number, email: string, password: string, role: string }): void {
    const data = [id, email, password, role]
    console.log('Sendig Employee Form: ', data);
    this.addEmployeeRef.close(data);
  }

  close(): void {
    this.addEmployeeRef.close();
  }

}
