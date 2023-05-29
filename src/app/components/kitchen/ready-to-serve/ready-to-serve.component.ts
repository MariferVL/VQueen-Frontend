import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ready-to-serve',
  templateUrl: './ready-to-serve.component.html',
  styleUrls: ['./ready-to-serve.component.css']
})
export class ReadyToServeComponent {
  constructor(
    private titleService: Title
    ) {}

  ngOnInit() {
    this.titleService.setTitle('VQ - Ready!');
  }
}
