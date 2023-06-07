import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { of, throwError } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['autoLogin']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
      providers: [
        Title,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authServiceMock = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('autoLogin', () => {
    it('should navigate to "/vq-menu" on successful auto-login', () => {
      spyOn(component['router'], 'navigateByUrl');
      authServiceMock.autoLogin.and.returnValue(of(null));

      component.autoLogin();

      expect(authServiceMock.autoLogin).toHaveBeenCalled();
      expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/vq-menu');
    });

    it('should handle error and log it to the console when auto-login fails', () => {
      spyOn(console, 'error');
      authServiceMock.autoLogin.and.returnValue(throwError(new Error('Login failed')));

      component.autoLogin();

      expect(authServiceMock.autoLogin).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(new Error('Login failed'));
    });
  });
});
