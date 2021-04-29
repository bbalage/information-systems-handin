import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberQueryObject } from 'src/app/member/member-search/member-query-object';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {

  @Output() searched: EventEmitter<MemberQueryObject> = new EventEmitter();

  memberSearchForm: FormGroup = this.formbuilder.group({
    name: [''],
    idCardNumber: [''],
    id: ['']
  });

  constructor(
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  searchMembers() {
    const queryObject: MemberQueryObject = this.memberSearchForm.value;
    //TODO: Remove possible whitespaces.
    this.searched.emit(queryObject);
  }

}
