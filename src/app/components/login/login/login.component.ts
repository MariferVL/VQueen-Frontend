import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userRole: string = '';
  title: string = 'Welcome!';
  private subscription: Subscription | undefined;

  constructor(
    private titleService: Title,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('VQ - Team');
  }

  isLoggedIn(): boolean {
    return !!this.authService.accessToken;
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
