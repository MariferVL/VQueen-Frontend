import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/types';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.css']
})
export class MenuModalComponent {
  products: Product[] = [];

  constructor(
    public addMenuRef: MatDialogRef<MenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { products: Product[] }
  ) {
    this.products = data.products;
  }

  onSubmit({ id, name, price, image, type, dateEntry }:
    { id: number, name: string, price: number, image: string, type: string, dateEntry: string}): void {
    const data = [id, name, price, image, type, dateEntry]
    console.log('Sendig Menu Form: ', data);
    this.addMenuRef.close(data);
  }

  close(): void {
    this.addMenuRef.close();
  }

}

