import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ColabMainComponent } from './colab-main.component';


describe('ColabMainComponent', () => {
  let component: ColabMainComponent;
  let fixture: ComponentFixture<ColabMainComponent>;
  let authService: AuthService;
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ColabMainComponent],
      providers: [AuthService, ChangeDetectorRef],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColabMainComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    cdr = TestBed.inject(ChangeDetectorRef);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title on initialization', () => {
    const titleService: Title = TestBed.inject(Title);
    spyOn(titleService, 'setTitle');
    fixture.detectChanges();
    expect(titleService.setTitle).toHaveBeenCalledWith('VQColab - Main');
  });

  it('should have empty email and password initially', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
  });

  it('should have showPassword set to false initially', () => {
    expect(component.showPassword).toBeFalse();
  });

  it('should have userID set to 0 initially', () => {
    expect(component.userID).toBe(0);
  });


  it('should return true for isLoggedIn when accessToken is set', () => {
    spyOnProperty(authService, 'accessToken').and.returnValue('fake-token');
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should call authService.logout() when logout() is called', () => {
    spyOn(authService, 'logout');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should unsubscribe from the subscription on component destruction', () => {
    const subscription: Subscription = TestBed.inject(Subscription);
    component.subscription = subscription;
    spyOn(subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });
});
