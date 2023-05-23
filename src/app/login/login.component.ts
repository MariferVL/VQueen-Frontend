import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../types';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  private subscription: Subscription = new Subscription();
  private accessToken: any;
  showPassword: boolean = false;
  userRole: string = '';
  userID: number = 0;

  
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    ) {}

  
  login(): void {
    console.log(this.email + ' ' +  this.password);
    this.authService.login(this.email, this.password)
    .subscribe({
      next: (response: any) => {
        //TODO: PREGUNTA: cuánto dura un token? Pq se reinicia constantemente
        this.authService.accessToken = response.accessToken;
        //TODO: PREGUNTA: Es mejor dejar esto en auth.service???
        this.adminService.getUsers().subscribe((users: User[]) => {
          const user = users.find((user) => user.email === this.email);
          if (user) {
            this.userRole = user.role;
            this.userID = user.id;

            console.log('this.userRole:', this.userRole);
            console.log('this.userID:', this.userID);

          } else {
            console.log('User not found.');
          }
        });
        
        console.log('In next this.accessToken:', this.authService.accessToken);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.authService.accessToken;
  }
  
  logout(): void {
    this.authService.accessToken = undefined;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
