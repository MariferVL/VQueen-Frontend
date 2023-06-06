import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { EmployeeModalComponent } from './employee-modal.component';
import { User } from 'src/app/interfaces/types';

@Component({ selector: 'app-employee-form', template: '' })
class MockEmployeeFormComponent {
  @Input() employees: User[]=[];
}

describe('EmployeeModalComponent', () => {
  let component: EmployeeModalComponent;
  let fixture: ComponentFixture<EmployeeModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EmployeeModalComponent>>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [EmployeeModalComponent, MockEmployeeFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: { employees: [] } }
      ]
    }).compileComponents();

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<EmployeeModalComponent>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when close() is called', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close the dialog with the provided data when submitForm() is called', () => {
    const testData = {
      id: 1,
      email: 'test@example.com',
      password: 'password',
      role: 'admin'
    };
    component.submitForm(testData);
    expect(dialogRefSpy.close).toHaveBeenCalledWith([testData.id, testData.email, testData.password, testData.role]);
  });
});
