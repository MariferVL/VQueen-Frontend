import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../interfaces/types';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit, OnDestroy {
  employee: User | undefined;
  private subscription: Subscription = new Subscription;
  currentUrl: string = '';

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    public router: Router,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQAdmin - Edit Member Data');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.adminService.getUserById(id)
      .subscribe(employee => this.employee = employee);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit({ email, password, role }: { email: string, password: string, role: string }): void {
    if (this.employee) {

      this.subscription = this.adminService.editUser(this.employee.id, email, password, role)
        .subscribe(() => {
          this.router.navigateByUrl('/member');
        });
    }
  }
}
