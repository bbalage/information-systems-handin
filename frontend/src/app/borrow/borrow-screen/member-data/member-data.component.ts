import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Borrowable } from 'src/app/models/borrowable';
import { MemberBorrows } from 'src/app/models/memberBorrows';
import { BorrowService } from 'src/app/services/borrow.service';
import { BorrowableService } from 'src/app/services/borrowable.service';

@Component({
  selector: 'app-member-data',
  templateUrl: './member-data.component.html',
  styleUrls: ['./member-data.component.css']
})
export class MemberDataComponent implements OnInit {
  
  @Input()
  memberBorrows!: MemberBorrows;

  constructor(
    private route: ActivatedRoute,
    private borrowService: BorrowService,
    private borrowableService: BorrowableService
  ) { }

  async ngOnInit() {}

  getDisplayNameOfStatus(status: string) : string {
    if (status === 'i') {
      return 'Inactive';
    }
    if (status === 'a') {
      return 'Active';
    }
    return '';
  }
}
