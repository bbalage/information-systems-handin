import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Borrowable } from '../models/borrowable';
import { BorrowableService } from '../services/borrowable.service';
import { BorrowableQueryObject } from './borrowable-search/borrowable-query-object';

@Component({
  selector: 'app-borrowable',
  templateUrl: './borrowable.component.html',
  styleUrls: ['./borrowable.component.css']
})
export class BorrowableComponent implements OnInit {

  borrowables: Borrowable[] = [];
  success: boolean = true;

  constructor(
    private borrowableService: BorrowableService,
    private router: Router
    ) { }

  async ngOnInit() {
    this.fetchBorrowables();
  }

  async fetchBorrowables() {
    const response = await this.borrowableService.searchBorrowables();
    this.success = response.success;
    
    this.borrowables = response.data ? response.data : this.borrowables;
  }

  async searchBorrowables(searchQuery: BorrowableQueryObject) {
    const response = await this.borrowableService.searchBorrowables(searchQuery);
    this.success = response.success;

    this.borrowables = response.data ? response.data : this.borrowables;
  }

  //TODO
  navigateToNewBorrowableForm() {
    this.router.navigateByUrl('/borrowable/create');
  }

  //TODO
  navigateToUpdateBorrowableForm(serialNumber: number) {
    this.router.navigate(['/borrowable/update', serialNumber]);
  }

  //TODO
  deleteBorrowable(borrowable: Borrowable) {
    this.borrowableService.deleteBorrowable(borrowable.serialNumber);
    //TODO: Discard
  }
}
