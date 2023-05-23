import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../types';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {
  @Input() buttonText: any;
  @Input() currentEmail = '';
  @Input() currentPassword = '';
  @Input() currentRole = '';


  id: number = 0;
  email: string = '';
  password: string = '';
  role: string = '';

  @Output() onSubmit = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
    this.email = this.currentEmail;
    this.password = this.currentPassword;
    this.role = this.currentRole;

  }

  /**
   * Take data from employee form and send it trough a method 
   * that emits an event containing that data.
   */
  onClick(): void {
    this.onSubmit.emit({
      id: this.generateUniqueId(),
      email: this.email,
      password: this.password,
      role: this.role,
    });
  }

  /**
   * Generate unique id based on timestamp
   * @returns number
   */
  private generateUniqueId(): number {
    const timestamp = Date.now();
    const randomString = Math.random();
    return Math.floor(timestamp + randomString);
  }



}
