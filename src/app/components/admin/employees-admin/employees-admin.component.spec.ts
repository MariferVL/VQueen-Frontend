import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeesAdminComponent } from './employees-admin.component';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../interfaces/types';
import { EmployeeModalComponent } from '../../modals/employee-modal/employee-modal.component';

describe('EmployeesAdminComponent', () => {
  let component: EmployeesAdminComponent;
  let fixture: ComponentFixture<EmployeesAdminComponent>;
  let titleService: Title;
  let adminService: AdminService;
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<EmployeeModalComponent>;

  const mockEmployees: User[] = [
    { id: 1, email: 'employee1@example.com', password: 'password1', role: 'role1' },
    { id: 2, email: 'employee2@example.com', password: 'password2', role: 'role2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesAdminComponent],
      imports: [MatDialogModule, RouterTestingModule],
      providers: [
        Title,
        {
          provide: AdminService,
          useValue: {
            getUsers: () => of(mockEmployees),
            deleteUser: () => of(null),
            addUser: () => of(null)
          }
        },
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['afterClosed'])
        },
        {
          provide: MatDialog,
          useValue: {
            open: () => {
              return {
                afterClosed: () => of([3, 'employee3@example.com', 'password3', 'role3'])
              };
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesAdminComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    adminService = TestBed.inject(AdminService);
    dialog = TestBed.inject(MatDialog);
    dialogRef = TestBed.inject(MatDialogRef);
    spyOn(titleService, 'setTitle').and.stub();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title on initialization', () => {
    fixture.detectChanges();
    expect(titleService.setTitle).toHaveBeenCalledWith('VQAdmin - Employee Data');
  });

  it('should load employees and set filtered employees on initialization', () => {
    spyOn(adminService, 'getUsers').and.returnValue(of(mockEmployees));

    fixture.detectChanges();
    expect(adminService.getUsers).toHaveBeenCalled();
    expect(component.employees).toEqual(mockEmployees);
    expect(component.isLoading).toBeFalse();
    expect(component.filteredEmployees).toEqual(mockEmployees);
  });

  it('should unsubscribe from the subscription on component destruction', () => {
    spyOn(component.subscription, 'unsubscribe').and.callThrough();

    fixture.detectChanges();
    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should filter employees based on role', () => {
    const role = 'role1';
    component.employees = mockEmployees;

    component.filterEmployees(role);

    expect(component.filteredEmployees.length).toBe(1);
    expect(component.filteredEmployees[0].role).toBe(role);
  });

  it('should delete an employee and update the employees list', () => {
    spyOn(adminService, 'deleteUser').and.returnValue(of(null));
    component.employees = mockEmployees;
    component.filteredEmployees = mockEmployees;

    component.onDeleteClicked(1);

    expect(adminService.deleteUser).toHaveBeenCalledWith(1);
    expect(component.employees.length).toBe(1);
    expect(component.employees[0].id).toBe(2);
    expect(component.filteredEmployees.length).toBe(1);
    expect(component.filteredEmployees[0].id).toBe(2);
  });

  it('should open the employee modal and add a new employee', () => {
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    spyOn(dialogRef, 'afterClosed').and.returnValue(of([3, 'employee3@example.com', 'password3', 'role3']));
    spyOn(adminService, 'addUser').and.returnValue(of(null as any));

    component.onSubmit();

    expect(dialog.open).toHaveBeenCalledWith(EmployeeModalComponent, {
      width: '800px',
      data: { employees: component.employees }
    });

    expect(adminService.addUser).toHaveBeenCalledWith(3, 'employee3@example.com', 'password3', 'role3');

    expect(component.employees.length).toBe(3);
    expect(component.employees[2]).toEqual({ id: 3, email: 'employee3@example.com', password: 'password3', role: 'role3' });

    expect(component.filteredEmployees).toEqual(component.employees);
  });

  it('should not add a new employee if dialog is closed without data', () => {
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(null as any));
    spyOn(adminService, 'addUser').and.returnValue(of(null as any));

    component.onSubmit();

    expect(dialog.open).toHaveBeenCalledWith(EmployeeModalComponent, {
      width: '800px',
      data: { employees: component.employees }
    });

    expect(adminService.addUser).not.toHaveBeenCalled();

    expect(component.employees.length).toBe(2);
    expect(component.filteredEmployees).toEqual(component.employees);
  });
});
