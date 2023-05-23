import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  constructor(
    private titleService: Title,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.titleService.setTitle('VQAdmin - Main');
  }

  isLoggedIn(): boolean {
    return !!this.authService.accessToken;
  }
  
  logout(): void {
    this.authService.accessToken = undefined;
  }
}



