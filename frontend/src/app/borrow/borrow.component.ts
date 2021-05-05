import { Component, OnInit } from '@angular/core';
import { Borrowable } from '../models/borrowable';
import { BorrowService } from '../services/borrow.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  borrowed: Borrowable[] = [];

  constructor(
    private borrowService: BorrowService
  ) { }

  async ngOnInit() {
    const response = await this.borrowService.getBorrows();
    if (response.data) {
      this.borrowed = response.data;
    }
  }

  bringBack (serialNumber: number) {
    console.log("Bringing back");
  }
}
