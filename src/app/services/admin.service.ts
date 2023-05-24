import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, User } from '../types';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  private get httpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.accessToken}`
      })
    };
  }

  getMenus(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`,
    this.httpOptions,);
  }

  getMenusById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`,
    this.httpOptions,)
  }


  deleteMenu(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`,
    this.httpOptions,)
  }

  createMenu(id: number, name: string, price: number, image:string, type: string, dateEntry: string ): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiUrl}/products`,
      {id, name, price, image, type, dateEntry },
      this.httpOptions,
    );
  }

  editMenu(id: number, name: string,price: number, image: string, type: string, dateEntry: string ): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/products/${id}`,
      {id, name, price, image, type, dateEntry},
      this.httpOptions,
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`,
    this.httpOptions);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`,
    this.httpOptions)
  }

  addUser(id: number, email: string, password:string, role:string): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/users`,
      {id, email, password, role},
      this.httpOptions
    );
  }

  editUser(id: number, email: string, password:string, role:string): Observable<User> {
    return this.http.patch<User>(
      `${this.apiUrl}/users/${id}`,
      {id, email, password, role},
      this.httpOptions
    );
  }


  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`,
    this.httpOptions)
  }


}
