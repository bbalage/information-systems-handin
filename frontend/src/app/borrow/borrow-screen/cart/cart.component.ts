import { Component, OnInit } from '@angular/core';
import { Borrowable } from 'src/app/models/borrowable';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Borrowable[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  async borrowItems() {
    console.log(this.cart);
  }
}
