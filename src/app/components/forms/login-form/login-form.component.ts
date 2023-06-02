import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  userRole: string = '';
  userID: number = 0;


  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) {
  }


  @Output() loginSubmit: EventEmitter<any> = new EventEmitter<any>();

  async login(): Promise<void> {
    try {
      const response: any = await this.authService.login(this.email, this.password).toPromise();
      this.authService.accessToken = response.accessToken;
      localStorage.setItem('accessToken', response.accessToken);

      const users: User[] = await firstValueFrom(this.adminService.getUsers());
      const user = users.find((user) => user.email === this.email);

      if (user) {
        this.authService.setUserRole(user.role);

        this.userID = user.id;
 
      } else {
        console.log('User not found.');
      }
    } catch (error) {
      console.error(error);
    }
  }

}
