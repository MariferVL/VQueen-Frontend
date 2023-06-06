import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsernameModalComponent } from './username-modal.component';

describe('UsernameModalComponent', () => {
  let component: UsernameModalComponent;
  let fixture: ComponentFixture<UsernameModalComponent>;
  let dialogRef: MatDialogRef<UsernameModalComponent>;

  beforeEach(waitForAsync(() => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [UsernameModalComponent],
      imports: [FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the customer name', () => {
    spyOn(console, 'log');
    component.customerName = 'John Doe';
    component.submitCustomerName();
    expect(console.log).toHaveBeenCalledWith('Submitted Customer Name:', 'John Doe');
    expect(dialogRef.close).toHaveBeenCalledWith('John Doe');
  });

  it('should close the dialog', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
