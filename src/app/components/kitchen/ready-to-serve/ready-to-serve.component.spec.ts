import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ReadyToServeComponent } from './ready-to-serve.component';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/types';

describe('ReadyToServeComponent', () => {
  let component: ReadyToServeComponent;
  let fixture: ComponentFixture<ReadyToServeComponent>;
  let titleService: Title;
  let orderService: jasmine.SpyObj<OrderService>;
  let authService: jasmine.SpyObj<AuthService>;

const orders: Order[] = [
  {
    id: 1,
    userId: 1,
    client: 'Client 1',
    products: [
      { id: 1, name: 'Product 1', price: 10, image: 'image1.jpg', type: 'Type 1', dateEntry: '2022-01-01', qty: 2 },
      { id: 2, name: 'Product 2', price: 15, image: 'image2.jpg', type: 'Type 2', dateEntry: '2022-01-02', qty: 3 },
    ],
    status: 'ready',
    dateEntry: '2022-01-01',
    dateProcessed: '2022-01-02',
  },
  {
    id: 2,
    userId: 2,
    client: 'Client 2',
    products: [
      { id: 3, name: 'Product 3', price: 20, image: 'image3.jpg', type: 'Type 3', dateEntry: '2022-01-03', qty: 1 },
      { id: 4, name: 'Product 4', price: 25, image: 'image4.jpg', type: 'Type 4', dateEntry: '2022-01-04', qty: 2 },
    ],
    status: 'cooking',
    dateEntry: '2022-01-03',
    dateProcessed: '2022-01-04',
  },
];


  beforeEach(async () => {
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrders', 'editOrder']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['']);

    await TestBed.configureTestingModule({
      declarations: [ReadyToServeComponent],
      providers: [
        { provide: Title, useValue: jasmine.createSpyObj('Title', ['setTitle']) },
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadyToServeComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    orderService.getOrders.and.returnValue(of(orders));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title on initialization', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith('VQ - Ready!');
  });

  it('should fetch orders on initialization', () => {
    expect(orderService.getOrders).toHaveBeenCalled();
    expect(component.orders).toEqual(orders);
  });

  it('should sort orders by date', () => {
    const sortedOrders = component.sortByDate();
    expect(sortedOrders).toEqual(orders.sort((a, b) => new Date(a.dateProcessed).getTime() - new Date(b.dateProcessed).getTime()));
  });

  it('should filter orders by status', () => {
    component.filterByStatus();
    expect(component.cookingOrders).toEqual(orders.filter(order => order.status === 'cooking'));
    expect(component.readyOrders).toEqual(orders.filter(order => order.status === 'ready'));
  });

  it('should get the current date and time in the expected format', () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${component.padZero(currentDate.getMonth() + 1)}-${component.padZero(currentDate.getDate())}`;
    const formattedTime = `${component.padZero(currentDate.getHours())}:${component.padZero(currentDate.getMinutes())}`;
    const expectedDateTime = `${formattedDate} ${formattedTime}`;
    expect(component.getCurrentDateTime()).toBe(expectedDateTime);
  });

  it('should mark an order as delivered', () => {
    const order: Order = {
      id: 1,
      userId: 1,
      client: 'John Doe',
      products: [],
      status: 'ready',
      dateEntry: '',
      dateProcessed: ''
    };

    orderService.editOrder.and.returnValue(of(order));

    component.markAsDelivered(order);

    expect(order.status).toBe('delivered');
    expect(order.dateProcessed).toBeDefined();
    expect(orderService.editOrder).toHaveBeenCalledWith(order.id, order.status, order.dateProcessed);
  });


  it('should serve an order by removing it from readyOrders array', () => {
    const order: Order = { id: 1, userId: 1, client: 'Client 1', products: [], status: 'ready', dateEntry: '', dateProcessed: '' };
    component.readyOrders = [order];
    component.serveOrder(order);
    expect(component.readyOrders).toEqual([]);
  });
});
