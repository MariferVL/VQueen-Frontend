import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  logoImg: string = 'assets/Images/vqlogo.png'; 
  autoLoginSubs: Subscription | undefined;
  
  constructor(
    private router: Router,
    private titleService: Title,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.titleService.setTitle('VQ - Home');
  }

  ngOnDestroy(): void {
    if (this.autoLoginSubs) {
      this.autoLoginSubs.unsubscribe();
    }
  }

  autoLogin(): void {
    this.autoLoginSubs = this.authService.autoLogin().subscribe({
      next: () => {
        this.router.navigateByUrl('/vq-menu');
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  
}


