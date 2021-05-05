import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Borrowable } from 'src/app/models/borrowable';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Borrowable[] = [];

  @Input()
  toCart!: Subject<Borrowable>;

  @Input()
  stillAllowedBorrows!: number;

  @Output()
  fromCart: EventEmitter<Borrowable> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.toCart.subscribe(event => {
      this.cart.push(event);
    });
  }

  removeFromCart(borrowable: Borrowable) {
    this.fromCart.emit(borrowable);
    const indexOfRemoved = this.cart.indexOf(borrowable);
    this.cart.splice(indexOfRemoved, 1);
  }

  async borrowItems() {
    console.log(this.cart);
  }
}
