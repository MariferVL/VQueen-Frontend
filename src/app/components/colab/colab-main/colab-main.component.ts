import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../../types';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-colab-main',
  templateUrl: './colab-main.component.html',
  styleUrls: ['./colab-main.component.css']
})
export class ColabMainComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  userRole: string = '';
  userID: number = 0;
  private subscription: Subscription | undefined;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,

  ) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.authService.accessToken = token;
    }
  }

  ngOnInit(): void {
    console.log('ColabMainComponent initialized.');
    this.titleService.setTitle('VQColab - Main');
    setTimeout(() => {
      this.authService.getUserRole().subscribe((userRole: string) => {
        this.userRole = userRole;
        console.log('Colab this.userRole: ', this.userRole);
        //TODO: PREGUNTA: Es necesario o mas bien correcto
        // usar este metodo para detectar cambios?
        this.cdr.detectChanges();
      });
    });
  }

  onLoginSubmit(data: any): void {
    console.log('Colab Login form submitted:', data);
    console.log('this.authService.getUserRole(): ', this.userRole);
  }

  get isLoggedIn(): boolean {
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