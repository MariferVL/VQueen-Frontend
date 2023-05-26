import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.titleService.setTitle('VQ - Home');
  }

  //TODO: PREGUNTA: Creo que hay una dessincronización 
  //        la primera vez que se invoca este método.
  autoLogin() {
    this.authService.autoLogin();
    this.router.navigateByUrl('/vq-menu');
  }
}
