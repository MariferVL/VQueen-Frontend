import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormComponent } from './employee-form.component';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [EmployeeFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties correctly', () => {
    expect(component.buttonText).toBeUndefined();
    expect(component.currentEmail).toBe('');
    expect(component.currentPassword).toBe('');
    expect(component.currentRole).toBe('');
    expect(component.id).toBe(0);
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.role).toBe('');
  });

  // it('should set component properties based on input values during initialization', () => {
  //   component.currentEmail = 'test@example.com';
  //   component.currentPassword = 'password';
  //   component.currentRole = 'admin';
  //   fixture.detectChanges();

  //   expect(component.email).toBe('test@example.com');
  //   expect(component.password).toBe('password');
  //   expect(component.role).toBe('admin');
  // });

  it('should emit an event with the correct user data on click', () => {
    spyOn(component.onSubmit, 'emit');
    component.email = 'test@example.com';
    component.password = 'password';
    component.role = 'admin';

    component.onClick();

    expect(component.onSubmit.emit).toHaveBeenCalledWith({
      id: jasmine.any(Number),
      email: 'test@example.com',
      password: 'password',
      role: 'admin'
    });
  });

  it('should generate a unique ID based on timestamp and random string', () => {
    const uniqueId = component['generateUniqueId']();
    expect(uniqueId).toBeDefined();
    expect(uniqueId).toEqual(jasmine.any(Number));
  });
});
