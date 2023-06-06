import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { Product, User } from '../interfaces/types';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  const apiURL = 'http://localhost:8080';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMenus', () => {
    it('should send a GET request to retrieve menus', () => {
      const mockMenus: Product[] = [ ({ id: 1, name: 'Menu 1', price: 10, image: 'image.png', type: 'Beverages', dateEntry: '2023-05-23 19:39:16' }) ];

      service.getMenus().subscribe((menus) => {
        expect(menus).toEqual(mockMenus);
      });

      const req = httpMock.expectOne(`${apiURL}/products`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMenus);
    });
  });

  describe('getMenusById', () => {
    it('should send a GET request to retrieve a menu by ID', () => {
      const menuId = 1;
      const mockMenu: Product = { id: 1, name: 'Menu 1', price: 10, image: 'image.png', type: 'Beverages', dateEntry: '2023-05-23 19:39:16' };
  
      service.getMenusById(menuId).subscribe((menu) => {
        expect(menu).toEqual(mockMenu);
      });
  
      const req = httpMock.expectOne(`${apiURL}/products/${menuId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMenu);
    });
  });
  

  describe('deleteMenu', () => {
    it('should send a DELETE request to delete a menu by ID', () => {
      const menuId = 1;

      service.deleteMenu(menuId).subscribe();

      const req = httpMock.expectOne(`${apiURL}/products/${menuId}`);
      expect(req.request.method).toBe('DELETE');
    });
  });

  describe('createMenu', () => {
    it('should send a POST request to create a menu', () => {
      const mockMenu: Product = { id: 1, name: 'Menu 1', price: 10,  image: 'image.jpg', type:'type', dateEntry: '2023-06-05' };

      service.createMenu(1, 'Menu 1', 10, 'image.jpg', 'type', '2023-06-05').subscribe((menu) => {
        expect(menu).toEqual(mockMenu);
      });

      const req = httpMock.expectOne(`${apiURL}/products`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        id: 1,
        name: 'Menu 1',
        price: 10,
        image: 'image.jpg',
        type: 'type',
        dateEntry: '2023-06-05',
      });
      req.flush(mockMenu);
    });
  });

  describe('editMenu', () => {
    it('should send a PATCH request to update a menu by ID', () => {
      const menuId = 1;
      const mockMenu: Product = { id: menuId, name: 'Updated Menu', price: 20,image: 'image.png', type:'type', dateEntry: '2023-01-02' };

      service.editMenu(menuId, 'Updated Menu', 20, 'image.jpg', 'type', '2023-06-05').subscribe((menu) => {
        expect(menu).toEqual(mockMenu);
      });

      const req = httpMock.expectOne(`${apiURL}/products/${menuId}`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({
        id: menuId,
        name: 'Updated Menu',
        price: 20,
        image: 'image.jpg',
        type: 'type',
        dateEntry: '2023-06-05',
      });
      req.flush(mockMenu);
    });
  });

  describe('getUsers', () => {
    it('should send a GET request to retrieve users', () => {
      const mockUsers: User[] = [{ id: 1, email: 'user1@example.com', password: 'password1', role: 'admin' }];

      service.getUsers().subscribe((users) => {
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne(`${apiURL}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('should send a GET request to retrieve a user by ID', () => {
      const userId = 1;
      const mockUser: User = { id: userId, email: 'user1@example.com', password: 'password1', role: 'admin' };

      service.getUserById(userId).subscribe((user) => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${apiURL}/users/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });
  });

  describe('addUser', () => {
    it('should send a POST request to add a user', () => {
      const mockUser: User = { id: 1, email: 'user1@example.com', password: 'password1', role: 'admin' };

      service.addUser(1, 'user1@example.com', 'password1', 'admin').subscribe((user) => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${apiURL}/users`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        id: 1,
        email: 'user1@example.com',
        password: 'password1',
        role: 'admin',
      });
      req.flush(mockUser);
    });
  });

  describe('editUser', () => {
    it('should send a PATCH request to update a user by ID', () => {
      const userId = 1;
      const mockUser: User = { id: userId, email: 'user1@example.com', password: 'updatedPassword', role: 'admin' };

      service.editUser(userId, 'user1@example.com', 'updatedPassword', 'admin').subscribe((user) => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${apiURL}/users/${userId}`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({
        id: userId,
        email: 'user1@example.com',
        password: 'updatedPassword',
        role: 'admin',
      });
      req.flush(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('should send a DELETE request to delete a user by ID', () => {
      const userId = 1;

      service.deleteUser(userId).subscribe();

      const req = httpMock.expectOne(`${apiURL}/users/${userId}`);
      expect(req.request.method).toBe('DELETE');
    });
  });
});
