import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BorrowableQueryObject } from './borrowable-query-object';

@Component({
  selector: 'app-borrowable-search',
  templateUrl: './borrowable-search.component.html',
  styleUrls: ['./borrowable-search.component.css']
})
export class BorrowableSearchComponent implements OnInit {

  @Output() searched: EventEmitter<BorrowableQueryObject> = new EventEmitter();

  borrowableSearchForm: FormGroup = this.formbuilder.group({
    title: [''],
    author: ['']
  });

  constructor(
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  searchBorrowables() {
    const queryObject: BorrowableQueryObject = this.borrowableSearchForm.value;
    //TODO: Remove possible whitespaces.
    this.searched.emit(queryObject);
  }

}
