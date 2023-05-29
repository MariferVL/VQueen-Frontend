import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order, Product, ProductWithQty, User } from '../types';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080';
  selectedProducts: ProductWithQty[] = [];
  private customerName: string = '';

  // BehaviorSubject to track changes in order status
  private orderStatusSubj = new BehaviorSubject<boolean>(false);
  public orderStatus$ = this.orderStatusSubj.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { 
    
  }

  private get httpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.accessToken}`
      })
    };
  }

  /**
   * Add the selected product to the array or increase its qty if it already exists
   * @param product object
   */
  addSelectedProduct(product: Product): void {
    const existingProduct = this.selectedProducts.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.qty += 1; // Increase the qty of the existing product
      console.log('existingProduct: ', existingProduct);

    } else {
      const newProduct: ProductWithQty = { ...product, qty: 1 };
      this.selectedProducts.push(newProduct); // Add the new product to the array
      console.log('newProduct: ', newProduct);

    }
  }


  /**
   * Set the customer name for the order
   * @param name customer name
   */
  setCustomerName(name: string): void {
    this.customerName = name;
  }

  /**
   *Get the customer name for the order
   * @returns string customer name
   */
  getCustomerName(): string {
    return this.customerName;
  }

  /**
   * Get all the products selected
   * @returns array of products
   */
  getSelectedProducts(): ProductWithQty[] {
    return this.selectedProducts;
  }

  /**
   * Clear the selected products and customer name
   */
  clearOrder(): void {
    this.selectedProducts = [];
    this.customerName = '';
    localStorage.removeItem('customerName');
    // Set order status to false
    this.orderStatusSubj.next(false);
  }

  /**
   * Send a POST request to add the new order data.
   * @param client 
   * @param products 
   * @param status 
   * @param dateEntry 
   * @param id 
   * @returns http response 
   */
  addOrder(client: string, products: Product[], status: string, dateEntry: string, id: string): Observable<Order> {
    console.log('authToken: ', this.authService.accessToken);

    return this.http.post<Order>(
      `${this.apiUrl}/orders`,
      { client, products, status, dateEntry, id },
      this.httpOptions,
    );
  }

  /**
   * Get orders data trough a http GET request.
   * @returns http response with orders data
   */
  getOrders(): Observable<Order[]> {
    console.log('this.authService.accessToken: ', this.authService.accessToken);
    
    return this.http.get<Order[]>(`${this.apiUrl}/orders`,
      this.httpOptions);
  }

  /**
   * Get data from an specific order trough a hhtp GET request based on order ID.
   * @param id 
   * @returns http response
   */
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`,
      this.httpOptions)
  }

  //FIXME: Es dateEntry o dateProcessed? O es un dato extra?{"status": "delivered", "dateProcessed": "2022-03-05 16:00"}
  /**
   * Edit order data trough a PATCH request.
   * @param status 
   * @param dateProcessed 
   * @returns 
   */
  editOrder(status: string, dateProcessed: string): Observable<Order> {
    return this.http.patch<Order>(
      `${this.apiUrl}/orders`,
      { status, dateProcessed },
      this.httpOptions,
    );
  }

  /**
   * Delete specific order based on its ID trough a DELETE request.
   * @param id 
   * @returns http response
   */
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/orders/${id}`,
      this.httpOptions)
  }



}
