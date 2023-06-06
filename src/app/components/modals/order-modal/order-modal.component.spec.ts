// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { OrderModalComponent } from './order-modal.component';

// describe('OrderModalComponent', () => {
//   let component: OrderModalComponent;
//   let fixture: ComponentFixture<OrderModalComponent>;
//   let dialogRefSpy: jasmine.SpyObj<MatDialogRef<OrderModalComponent>>;

//   beforeEach(async () => {
//     const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

//     await TestBed.configureTestingModule({
//       declarations: [OrderModalComponent],
//       providers: [
//         { provide: MatDialogRef, useValue: spy },
//         { provide: MAT_DIALOG_DATA, useValue: { products: [] } }
//       ]
//     }).compileComponents();

//     dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<OrderModalComponent>>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(OrderModalComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should close the dialog when close() is called', () => {
//     component.close();
//     expect(dialogRefSpy.close).toHaveBeenCalled();
//   });

//   it('should submit the order and close the dialog when submitOrder() is called', () => {
//     component.submitOrder();
//     expect(dialogRefSpy.close).toHaveBeenCalledWith('confirm');
//   });

//   it('should calculate the total for a product correctly', () => {
//     const product = { id: 123,qty: 2, price: 10,name: "Lili",image: "image.png",type: "Beverage",dateEntry: "2023-05-23 19:39:16" };
//     const total = component.calculateTotal(product);
//     expect(total).toBe(20);
//   });

//   it('should calculate the final total for all products correctly', () => {
//     component.products = [
//       { qty: 2, price: 10 },
//       { qty: 3, price: 5 },
//       { qty: 1, price: 8 }
//     ];
//     const finalTotal = component.calculateFinalTotal();
//     expect(finalTotal).toBe(44);
//   });

//   it('should calculate the tip correctly based on total and tip percentage', () => {
//     const total = 50;
//     const tipPercentage = 10;
//     const tip = component.calculateTip(total, tipPercentage);
//     expect(tip).toBe(5);
//   });
// });
