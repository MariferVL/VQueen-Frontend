import { TestBed } from '@angular/core/testing';
import { ManagerComponent } from './manager.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManagerComponent', () => {
  let component: ManagerComponent;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title on initialization', () => {
    expect(component.title).toBe('V Queen Management');
  });

  // it('should return true when user is logged in', () => {
  //   spyOn(authService, 'isLoggedIn').and.returnValue(true);
  //   expect(component.isLoggedIn()).toBe(true);
  // });

  it('should return false when user is not logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    expect(component.isLoggedIn()).toBe(false);
  });

  it('should call AuthService logout method when logout is called', () => {
    spyOn(authService, 'logout');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  // it('should unsubscribe from the subscription on component destroy', () => {
  //   spyOn(component.subscription, 'unsubscribe');
  //   component.ngOnDestroy();
  //   expect(component.subscription.unsubscribe).toHaveBeenCalled();
  // });
});
