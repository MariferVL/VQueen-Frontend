import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginFormComponent } from './login-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { of, throwError } from 'rxjs';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let adminServiceMock: jasmine.SpyObj<AdminService>;

  beforeEach(async () => {
    const adminServiceSpy = jasmine.createSpyObj('AdminService', ['getUsers']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'setUserRole']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AdminService, useValue: adminServiceSpy }
      ]
    }).compileComponents();

    authServiceMock = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    adminServiceMock = TestBed.inject(AdminService) as jasmine.SpyObj<AdminService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and set user role and ID', async () => {
    const mockResponse = { accessToken: 'mockToken' };
    const mockUsers = [
      { email: 'user1@example.com', password: 'password1', role: 'admin', id: 1 },
      { email: 'user2@example.com', password: 'password2', role: 'user', id: 2 }
    ];

    authServiceMock.login.and.returnValue(of(mockResponse));
    adminServiceMock.getUsers.and.returnValue(of(mockUsers));

    component.email = 'user1@example.com';
    component.password = 'password1';
    await component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith('user1@example.com', 'password1');
    expect(authServiceMock.accessToken).toBe('mockToken');
    expect(localStorage.getItem('accessToken')).toBe('mockToken');
    expect(component.userID).toBe(1);
    expect(authServiceMock.setUserRole).toHaveBeenCalledWith('admin');
  });

  it('should not set user role and ID if user not found', async () => {
    const mockResponse = { accessToken: 'mockToken' };
    const mockUsers = [
      { email: 'user1@example.com', password: 'password1', role: 'admin', id: 1 },
      { email: 'user2@example.com', password: 'password2', role: 'user', id: 2 }
    ];

    authServiceMock.login.and.returnValue(of(mockResponse));
    adminServiceMock.getUsers.and.returnValue(of(mockUsers));

    component.email = 'user3@example.com'; // User not found in the mockUsers array
    component.password = 'password3';
    await component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith('user3@example.com', 'password3');
    expect(authServiceMock.accessToken).toBe('mockToken');
    expect(localStorage.getItem('accessToken')).toBe('mockToken');
    expect(component.userID).toBe(0); // User not found, so userID should be 0
    expect(authServiceMock.setUserRole).not.toHaveBeenCalled();
  });

  it('should handle login error', async () => {
    const errorResponse = { message: 'Invalid credentials' };

    authServiceMock.login.and.returnValue(throwError(errorResponse));

    component.email = 'user1@example.com';
    component.password = 'password1';
    await component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith('user1@example.com', 'password1');
    expect(authServiceMock.accessToken).toBeUndefined();
    expect(localStorage.getItem('accessToken')).toBe('mockToken');
    expect(component.userID).toBe(0);
    expect(authServiceMock.setUserRole).not.toHaveBeenCalled();
  });
});


