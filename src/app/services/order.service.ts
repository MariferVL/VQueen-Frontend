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
  selectedProducts: Product[] = [];


  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  /**
 * Add the selected product to the array
 * @param product object
 */
  addSelectedProduct(product: Product): void {
    this.selectedProducts.push(product);
  }

  /**
   * Get all the products selected and return it as an array.
   * @returns array
   */
  getSelectedProducts(): Product[] {
    return this.selectedProducts;
  }

  addOrder(client: string, products: Product[], status: string, dateEntry: string): Observable<Order> {
    return this.http.post<Order>(
      `${this.apiUrl}/orders`,
      { client, products, status, dateEntry },
      this.httpOptions,
    );
  }




}
