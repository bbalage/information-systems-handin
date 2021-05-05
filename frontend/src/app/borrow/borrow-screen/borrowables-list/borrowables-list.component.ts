import { Component, OnInit } from '@angular/core';
import { Borrowable } from 'src/app/models/borrowable';
import { BorrowableService } from 'src/app/services/borrowable.service';

@Component({
  selector: 'app-borrowables-list',
  templateUrl: './borrowables-list.component.html',
  styleUrls: ['./borrowables-list.component.css']
})
export class BorrowablesListComponent implements OnInit {

  borrowables: Borrowable[] = [];

  constructor(
    private borrowableService: BorrowableService
  ) { }

  async ngOnInit() {
    const borrowablesResponse = await this.borrowableService.searchBorrowables();
    if (borrowablesResponse.data) {
      this.borrowables = borrowablesResponse.data;
    }
  }

  addToCart (borrowable: Borrowable) {
    console.log("To cart");
  }
}
