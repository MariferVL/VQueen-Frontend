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
  logoImg: string = 'assets/Images/vqlogo1.png'; 
  private autoLoginSubs: Subscription | undefined;
  
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

    //TODO: PREGUNTA: Creo que hay una dessincronización 
  //        la primera vez que se invoca este método.
  /**
   * returns an observable
   */
  autoLogin(): void {
    this.autoLoginSubs = this.authService.autoLogin().subscribe({
      next: () => {
        // Login successful
        this.router.navigateByUrl('/vq-menu');
      },
      error: (error: any) => {
        // Error occurred during login
        console.error(error);
        // Handle the error, such as displaying an error message to the user
      }
    });
  }
  
}


