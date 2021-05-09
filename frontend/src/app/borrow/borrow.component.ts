import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private borrowService: BorrowService
  ) { }

  async ngOnInit() {
    const response = await this.borrowService.getBorrows();
    if (response.data) {
      this.borrowed = response.data;
    }
  }

  bringBack (serialNumber: number) {
    this.router.navigate(['/borrow/bring-back', serialNumber]);
  }

  typeConvert(type: string): string {
    switch(type) {
      case 'b':
        return "Book";
      case 'c':
        return "CD";
      case 'm':
        return "Music Sheet";
      default:
        return "";
    }
  }
}
