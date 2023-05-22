import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return !!this.authService.accessToken;
  }

  logout(): void {
    this.authService.accessToken = undefined;
  }

}
