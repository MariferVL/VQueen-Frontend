import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../../../services/admin.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;
  currentUrl: string = '';
  
  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQAdmin - Add Member');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit({ id, email, password, role }:
    { id: number, email: string,  password: string, role: string }): void {
    this.subscription = this.adminService.addUser(id, email, password, role)
      .subscribe(() => {
        console.log('Adding a new member.👑');
        this.router.navigate(['/member']);
      });
  }
}
