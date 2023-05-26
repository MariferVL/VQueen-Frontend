import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColabMainComponent } from './colab-main.component';

describe('ColabMainComponent', () => {
  let component: ColabMainComponent;
  let fixture: ComponentFixture<ColabMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColabMainComponent]
    });
    fixture = TestBed.createComponent(ColabMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
