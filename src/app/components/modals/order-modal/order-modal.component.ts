import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product, ProductWithQuantity } from 'src/app/types';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent {
  products: ProductWithQuantity[] = [];
  tip: number = 10;

  constructor(
    public confirmRef: MatDialogRef<OrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { products: ProductWithQuantity[] }
    ) {
      this.products = data.products;
    }

  submitOrder(): void {
    console.log('Order Submitted to Kitchen👩🏻‍🍳👨🏻‍🍳');
    // Close the modal
    const result = 'confirm';
    this.confirmRef.close(result);
  }

  close(): void {
    this.confirmRef.close();
  }

  /**
   * Calculate the total for a single product based on quantity and price.
   * @param product 
   * @returns int
   */
  calculateTotal(product: ProductWithQuantity): number {
    return product.quantity * product.price;
  }

  /**
   * Calculate the final total for all products in the order.
   * @returns 
   */
  calculateFinalTotal(): number {
    return this.products.reduce((total, product) => total + this.calculateTotal(product), 0);
  }
  

  calculateTip(total: number, tipPercentage: number): number {
    return total * (tipPercentage / 100);
  }

}
