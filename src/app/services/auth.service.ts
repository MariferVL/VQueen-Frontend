import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  accessToken: string = '';
  private userRole: string = '';
  userRoleChanged: EventEmitter<string> = new EventEmitter<string>();
  subscription: any;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const postData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, postData);
  }

  //TODO: PREGUNTA: Esto está bien acá??
  autoLogin(): Observable<any> {
    const { email, password } = environment.credentials;

    return new Observable((observer) => {
      this.subscription = this.login(email, password).subscribe({
        next: (response: any) => {
          this.accessToken = response.accessToken;
          localStorage.setItem('accessToken', this.accessToken);
          observer.next(); // Emit next value to complete the observable
          observer.complete(); // Complete the observable
        },
        error: (error: any) => {
          console.error(error);
          observer.error(error); // Emit error value to complete the observable
          observer.complete(); // Complete the observable
        }
      });
    });
  }
  
  setUserRole(userRole: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.userRole = userRole;
      this.userRoleChanged.emit(userRole); // Emit the user role
      resolve();
    });
  }

  getUserRole(): Observable<string> {
    return this.userRoleChanged.asObservable();
  }
  

  logout(): void {
    this.accessToken = '';
    localStorage.removeItem('accessToken');
  }
}
