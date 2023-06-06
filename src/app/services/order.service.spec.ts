import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OrderService } from './order.service';
import { AuthService } from './auth.service';
import { Order } from '../interfaces/types';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add selected product', () => {
    const product = { id: 1, name: 'Product 1', price: 10, image: 'image.png', type: 'Type 1', dateEntry: '2023-05-23 19:39:16' };
    service.addSelectedProduct(product);
    expect(service.getSelectedProducts()).toContain({ ...product, qty: 1 });

    service.addSelectedProduct(product);
    expect(service.getSelectedProducts()).toContain({ ...product, qty: 2 });
  });

  it('should set and get customer name', () => {
    const customerName = 'John Doe';
    service.setCustomerName(customerName);
    expect(service.getCustomerName()).toBe(customerName);
  });

  it('should clear the order', () => {
    service.addSelectedProduct({ id: 1, name: 'Product 1', price: 10, image: 'image.png', type: 'Type 1', dateEntry: '2023-05-23 19:39:16' });
    service.setCustomerName('John Doe');
    service.clearOrder();
    expect(service.getSelectedProducts()).toEqual([]);
    expect(service.getCustomerName()).toBe('');
  });

  it('should send a POST request to add an order', () => {
    const order: Order = {
      id: 1,
      userId: 1,
      client: 'John Doe',
      products: [{ id: 1, name: 'Product 1', price: 10, image: 'image.png', type: 'Type 1', dateEntry: '2023-05-23 19:39:16',"qty": 1}],
      status: 'Pending',
      dateEntry: '2023-06-01 10:00:00',
      dateProcessed: ''
    };
  
    service.addOrder(order.client, order.products, order.status, order.dateEntry, order.id.toString()).subscribe((response) => {
      expect(response).toEqual(order);
    });
  
    const req = httpMock.expectOne(`${service.apiUrl}/orders`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service.authService.accessToken}`);
    req.flush(order);
  });
  
  
  it('should send a GET request to retrieve orders', () => {
    const orders: Order[] = [
      {
        id: 1,
        userId: 1,
        client: 'John Doe',
        products: [],
        status: 'Pending',
        dateEntry: '2023-06-01 10:00:00',
        dateProcessed: ''
      },
      {
        id: 2,
        userId: 2,
        client: 'Jane Smith',
        products: [],
        status: 'Completed',
        dateEntry: '2023-06-02 10:00:00',
        dateProcessed: ''
      }
    ];
  
    service.getOrders().subscribe((response) => {
      expect(response).toEqual(orders);
    });
  
    const req = httpMock.expectOne(`${service.apiUrl}/orders`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service.authService.accessToken}`);
    req.flush(orders);
  });
  

  it('should send a GET request to retrieve an order by ID', () => {
    const orderId = 1;
    const order: Order = {
      id: orderId,
      userId: 1,
      client: 'John Doe',
      products: [],
      status: 'Pending',
      dateEntry: '2023-06-01 10:00:00',
      dateProcessed: ''
    };
  
    service.getOrderById(orderId).subscribe((response) => {
      expect(response).toEqual(order);
    });
  
    const req = httpMock.expectOne(`${service.apiUrl}/orders/${orderId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service.authService.accessToken}`);
    req.flush(order);
  });
  
  it('should send a PATCH request to edit an order', () => {
    const orderId = 1;
    const status = 'Completed';
    const dateProcessed = '2023-06-03 10:00:00';
    const order: Order = {
      id: orderId,
      userId: 1,
      client: 'John Doe',
      products: [],
      status: status,
      dateEntry: '2023-06-01 10:00:00',
      dateProcessed: dateProcessed
    };
  
    service.editOrder(orderId, status, dateProcessed).subscribe((response) => {
      expect(response).toEqual(order);
    });
  
    const req = httpMock.expectOne(`${service.apiUrl}/orders/${orderId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service.authService.accessToken}`);
    expect(req.request.body).toEqual({ status, dateProcessed });
    req.flush(order);
  });
  
  it('should send a DELETE request to delete an order', () => {
    const orderId = 1;

    service.deleteOrder(orderId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.apiUrl}/orders/${orderId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service.authService.accessToken}`);
    req.flush({});
  });
});
