import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login and set access token', () => {
    const email = 'test@example.com';
    const password = 'password';
    const accessToken = 'mock-access-token';

    authService.login(email, password).subscribe((response: any) => {
      expect(response.accessToken).toBe(accessToken);
      expect(authService.accessToken).toBe(accessToken);
      expect(localStorage.getItem('accessToken')).toBe(accessToken);
    });

    const req = httpMock.expectOne(`${authService.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ accessToken });
  });

  it('should auto login and set access token', () => {
    const email = 'global_user@vqueen.com';
    const password = 'global_user2023';
    const accessToken = 'mock-access-token';

    spyOn(authService, 'login').and.returnValue(
      new Observable((observer) => {
        observer.next({ accessToken });
        observer.complete();
      })
    );

    authService.autoLogin().subscribe(() => {
      expect(authService.accessToken).toBe(accessToken);
      expect(localStorage.getItem('accessToken')).toBe(accessToken);
    });

    expect(authService.login).toHaveBeenCalledWith(email, password);
  });

  it('should set user role and emit the role change event', (done) => {
    const userRole = 'admin';

    authService.userRoleChanged.subscribe((role: string) => {
      expect(role).toBe(userRole);
      expect(localStorage.getItem('userRole')).toBe(userRole);
      done();
    });

    authService.setUserRole(userRole);
  });

  it('should return true if the user has the provided role', () => {
    const role = 'admin';

    localStorage.setItem('userRole', role);
    expect(authService.hasRole(role)).toBe(true);

    localStorage.setItem('userRole', 'user');
    expect(authService.hasRole(role)).toBe(false);
  });

  it('should return false if the user is not logged in', () => {
    authService.accessToken = '';
    expect(authService.isLoggedIn()).toBe(false);

    authService.accessToken = 'mock-access-token';
    expect(authService.isLoggedIn()).toBe(true);
  });

  it('should logout and clear access token and user role', () => {
    const navigateSpy = spyOn(authService.router, 'navigate');

    authService.accessToken = 'mock-access-token';
    localStorage.setItem('accessToken', 'mock-access-token');
    localStorage.setItem('userRole', 'admin');

    authService.logout();

    expect(authService.accessToken).toBe('');
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('userRole')).toBeNull();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
});
