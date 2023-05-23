import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, Product, User } from '../types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080';
  private authToken = this.authService.accessToken;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  addOrder(client: string, products: Product[], status:string, dateEntry: string ): Observable<Order> {
    return this.http.post<Order>(
      `${this.apiUrl}/orders`,
      {client, products, status, dateEntry },
      this.httpOptions,
    );
  }

  

}
