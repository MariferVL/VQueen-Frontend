import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuModalComponent } from './menu-modal.component';
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';
import { Product } from 'src/app/interfaces/types';

describe('MenuModalComponent', () => {
  let component: MenuModalComponent;
  let fixture: ComponentFixture<MenuModalComponent>;
  let mockDialogRef: MatDialogRef<MenuModalComponent>;

  const mockData: { products: Product[] } = {
    products: [
      {
        id: 1,
        name: 'Product 1',
        price: 9.99,
        image: 'product1.jpg',
        type: 'Type 1',
        dateEntry: '2023-06-06'
      },
      {
        id: 2,
        name: 'Product 2',
        price: 19.99,
        image: 'product2.jpg',
        type: 'Type 2',
        dateEntry: '2023-06-07'
      },
    ]  
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [MenuModalComponent, MenuFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ],
      imports: [FormsModule] // Add FormsModule to the imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize products correctly', () => {
    expect(component.products).toEqual(mockData.products);
  });

  it('should close the dialog when close() is called', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog and pass the form data when onSubmit() is called', () => {
    const formData = {
      id: 1,
      name: 'Product 1',
      price: 10.99,
      image: 'product1.jpg',
      type: 'Type 1',
      dateEntry: '2023-06-06'
    };

    component.onSubmit(formData);
    expect(mockDialogRef.close).toHaveBeenCalledWith([formData.id, formData.name, formData.price, formData.image, formData.type, formData.dateEntry]);
  });
});
