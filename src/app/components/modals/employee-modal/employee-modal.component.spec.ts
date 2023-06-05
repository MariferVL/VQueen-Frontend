import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeModalComponent } from './employee-modal.component';

describe('EmployeeModalComponent', () => {
  let component: EmployeeModalComponent;
  let fixture: ComponentFixture<EmployeeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeModalComponent]
    });
    fixture = TestBed.createComponent(EmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
