import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  userRole: string = '';

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private login: LoginComponent,
    ) {}

  ngOnInit() {
    this.titleService.setTitle('VQAdmin - Main');
  }

  isLoggedIn(): boolean {
    this.userRole = this.authService.getUserRole();    
    return !!this.authService.accessToken;
  }
  
  logout(): void {
    this.login.logout();
  }
}



