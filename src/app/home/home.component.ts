import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  logoImg: string = 'assets/Images/vqlogo1.png'; 
  
  constructor(
    private router: Router,
    private titleService: Title,
    private login: LoginComponent
    ) {}

  ngOnInit() {
    this.titleService.setTitle('VQ - Home');
  }

  autoLogin() {
    this.login.autoLogin();
    this.router.navigateByUrl('/menu');
  }
}
