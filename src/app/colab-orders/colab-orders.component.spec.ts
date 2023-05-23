import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColabOrdersComponent } from './colab-orders.component';

describe('ColabOrdersComponent', () => {
  let component: ColabOrdersComponent;
  let fixture: ComponentFixture<ColabOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColabOrdersComponent]
    });
    fixture = TestBed.createComponent(ColabOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
