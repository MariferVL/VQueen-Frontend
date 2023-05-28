import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private customerName: string = '';

  // BehaviorSubject to track changes in order status
  private orderStatusSubj = new BehaviorSubject<boolean>(false);
  public orderStatus$ = this.orderStatusSubj.asObservable();

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
  getSelectedProducts(): ProductWithQuantity[] {
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


  //TODO: PREGUNTA: ¿Cómo registro la cantidad de veces que se solicita un producto?
  addOrder(client: string, products: Product[], status: string, dateEntry: string, id: string): Observable<Order> {
    console.log('this.authToken: ', this.authToken);
    
    return this.http.post<Order>(
      `${this.apiUrl}/orders`,
      { client, products, status, dateEntry, id },
      this.httpOptions,
    );
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`,
      this.httpOptions);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`,
      this.httpOptions)
  }

  //FIXME: Es dateEntry o dateProcessed? O es un dato extra?{"status": "delivered", "dateProcessed": "2022-03-05 16:00"}
  editOrder(status: string, dateProcessed: string): Observable<Order> {
    return this.http.patch<Order>(
      `${this.apiUrl}/orders`,
      { status, dateProcessed },
      this.httpOptions,
    );
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/orders/${id}`,
      this.httpOptions)
  }



}
