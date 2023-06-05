import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQAdmin - Edit Member Data');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.adminService.getUserById(id)
      .subscribe(employee => this.employee = employee);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit({ email, password, role }: { email: string, password: string, role: string }): void {
    if (this.employee) {
      console.log('employee id: ', this.employee.id, ', ', this.employee.email, ', ', this.employee.role);

      this.subscription = this.adminService.editUser(this.employee.id, email, password, role)
        .subscribe(() => {
          console.log('Saving changes');
          //FIXME: cambiar a version de Luana
          window.location.href = '/member';
        });
    }
  }
}
