import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Borrowable } from 'src/app/models/borrowable';
import { BorrowableService } from 'src/app/services/borrowable.service';

@Component({
  selector: 'app-borrowables-list',
  templateUrl: './borrowables-list.component.html',
  styleUrls: ['./borrowables-list.component.css']
})
export class BorrowablesListComponent implements OnInit {

  @Input()
  stillAllowedBorrows!: number;

  @Input()
  fromCart!: Subject<Borrowable>;
  
  borrowables: Borrowable[] = [];
  
  @Output()
  toCart: EventEmitter<Borrowable> = new EventEmitter(); 

  constructor(
    private borrowableService: BorrowableService
  ) { }

  async ngOnInit() {
    this.fromCart.subscribe(event => {
      this.borrowables.push(event);
    })

    const borrowablesResponse = await this.borrowableService.searchBorrowables();
    if (borrowablesResponse.data) {
      this.borrowables = borrowablesResponse.data;
    }
  }

  addToCart (borrowable: Borrowable) {
    if (this.stillAllowedBorrows > 0) {
      this.toCart.emit(borrowable);
    }
    const indexOfSent = this.borrowables.indexOf(borrowable);
    this.borrowables.splice(indexOfSent, 1);
  }
}
