import { Component } from '@angular/core'; import { AuthService } from '../services/auth.service';
import { User } from '../types';
import { AdminService } from '../services/admin.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

//TODO: PREGUNTA: es útil usar onDestroy acá?
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  userRole: string = '';
  userID: number = 0;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
  ) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.authService.accessToken = token;
    }
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.authService.accessToken = response.accessToken;
        //store the access token in the local storage.
        localStorage.setItem('accessToken', response.accessToken);

        this.adminService.getUsers().subscribe((users: User[]) => {
          const user = users.find((user) => user.email === this.email);
          if (user) {
            this.authService.setUserRole(user.role);
            this.userRole = this.authService.getUserRole();
            this.userID = user.id;

          } else {
            console.log('User not found.');
          }
        });
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  autoLogin(): void {

    // Retrieve email and password from wherever you store them (e.g., localStorage)
    const {email, password} = environment.credentials;

    // Make API call to log in the user
    this.authService.login(email, password).subscribe({
      next: (response: any) => {
        this.authService.accessToken = response.accessToken;

        // Store the token securely.
        localStorage.setItem('accessToken', this.authService.accessToken);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  get isLoggedIn(): boolean {
    return !!this.authService.accessToken;
  }

  logout(): void {
    this.authService.accessToken = '';
    localStorage.removeItem('accessToken');
  }


}
