import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, Product, ProductWithQuantity, User } from '../types';
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
  selectedProducts: ProductWithQuantity[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }


  /**
   * Add the selected product to the array or increase its quantity if it already exists
   * @param product object
   */
  addSelectedProduct(product: Product): void {
    const existingProduct = this.selectedProducts.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increase the quantity of the existing product
      console.log('existingProduct: ', existingProduct);
      
    } else {
      const newProduct: ProductWithQuantity = { ...product, quantity: 1 };
      this.selectedProducts.push(newProduct); // Add the new product to the array
      console.log('newProduct: ', newProduct);
      
    }
  }

  /**
   * Get all the products selected and return them as an array.
   * @returns array
   */
  getSelectedProducts(): ProductWithQuantity[] {
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
