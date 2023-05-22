import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../types';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  email: string = '';
  message: string = '';
  menu: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('VQ - Add Product');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.menu = fakeMenu.find(menu => menu.id === id);
    this.message = `Hi, I want to order all the included in ${this.menu?.id}`;
  }

  sendMessage(): void {
    alert('🍽️ **Order Received! Fresh Ingredients at Work!** 🎉\nExciting news! Your order is in motion! 🌱 \nOur team is busy sourcing the freshest ingredients, crafting a culinary masterpiece just for you. \nGet ready for an unforgettable dining experience! \nBon appétit! 😊🍴');
    this.router.navigateByUrl('/menu');
   //TODO: Show this message while the food is being cooked.
    // alert('🍽️ **Exciting News! Your Food Order is Being Prepared!** 🎉 \n Your order is in safe hands! Our skilled team is meticulously selecting the freshest ingredients to craft your culinary masterpiece. 🌱🥦🍅 \nBehind the scenes, our talented chefs are passionately curating a symphony of flavors, ensuring that every bite exceeds your expectations. 🍽️✨\nGet ready to embark on a sensational gastronomic journey, where taste and quality unite to create an unforgettable dining experience. Bon appétit! 😊🍴')
  }

}
