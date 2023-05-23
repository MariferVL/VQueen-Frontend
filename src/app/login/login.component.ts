import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';


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
  
  constructor(private authService: AuthService) {}

  login(): void {
    console.log(this.email + ' ' +  this.password);
    this.authService.login(this.email, this.password)
    .subscribe({
      next: (response: any) => {
        //TODO: PREGUNTA: cuánto dura un token? Pq se reinicia constantemente
        this.authService.accessToken = response.accessToken;
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
