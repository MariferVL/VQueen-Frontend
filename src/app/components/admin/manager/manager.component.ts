import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit, OnDestroy {
  userRole: string = '';
  title: string = 'Welcome, VG Manager';
  private subscription: Subscription | undefined;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('ManagerComponent initialized.');
    this.titleService.setTitle('VQAdmin - Main');

    setTimeout(() => {
      this.authService.getUserRole().subscribe((userRole: string) => {
        this.userRole = userRole;
        console.log('Manager this.userRole: ', this.userRole);
        //TODO: PREGUNTA: Es necesario o mas bien correcto
        // usar este metodo para detectar cambios?
        this.cdr.detectChanges();
      });
    });
  }

  onLoginSubmit(data: any): void {
    console.log('Manager Login form submitted:', data);
    console.log('this.authService.getUserRole(): ', this.userRole);
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


