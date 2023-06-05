import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../interfaces/types';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {
  @Input() buttonText: any;
  @Input() currentName = '';
  @Input() currentImg = '';
  @Input() currentPrice = 0;
  @Input() currentType = '';


  id: number = 0;
  name: string = '';
  image: string = '';
  price: number = 0;
  type: string = '';
  dateEntry: string = '';


  @Output() onSubmit = new EventEmitter<Product>();

  constructor() {}

  ngOnInit(): void {
    this.name = this.currentName;
    this.image = this.currentImg;    
    this.price = this.currentPrice;
    this.type = this.currentType;

  }

  /**
   * Take data from menu form and send it trough a method 
   * that emits an event containing that data.
   */
  onClick(): void {
    this.onSubmit.emit({
      id: this.generateUniqueId(),
      name: this.name,
      image: this.image,
      price: Number(this.price),
      type: this.type,
      dateEntry: this.getCurrentDateTime(),
    });
  }

  /**
   * Generate unique id based on timestamp
   * @returns number
   */
  private generateUniqueId(): number {
    const timestamp = Date.now();
    const randomString = Math.random();
    return Math.floor(timestamp + randomString);
  }

  /**
   *  Creates a new Date object representing the current date and time.
   * @returns string
   */
  getCurrentDateTime(): string {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = this.padZero(currentDate.getMonth() + 1);
    const day = this.padZero(currentDate.getDate());
    const hour = this.padZero(currentDate.getHours());
    const minute = this.padZero(currentDate.getMinutes());
    const second = this.padZero(currentDate.getSeconds());
  
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }


  /**
   * Helper function that pads single-digit numbers with a leading zero,
   * ensuring consistent formatting.
   * @param num 
   * @returns string
   */
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
  
}
