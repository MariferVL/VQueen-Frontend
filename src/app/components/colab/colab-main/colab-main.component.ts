import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
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
  userID: number = 0;
  subscription: Subscription | undefined;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,

  ) {  }

  ngOnInit(): void {
    console.log('ColabMainComponent initialized.');
    this.titleService.setTitle('VQColab - Main');
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
