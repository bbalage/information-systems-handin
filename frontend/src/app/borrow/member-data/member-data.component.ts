import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberStatusDictionary } from 'src/app/models/member';
import { MemberBorrows } from 'src/app/models/memberBorrows';
import { BorrowService } from 'src/app/services/borrow.service';

@Component({
  selector: 'app-member-data',
  templateUrl: './member-data.component.html',
  styleUrls: ['./member-data.component.css']
})
export class MemberDataComponent implements OnInit {

  memberBorrows: MemberBorrows = {
    id: 0,
    name: '',
    phoneNumber: '',
    idCardNumber: '',
    address: '',
    status: '',
    numberOfCurrentBorrows: 0,
    numberOfStillAllowedBorrows: 0
  };
  //memberStatusDictionary: MemberStatusDictionary = new MemberStatusDictionary();
  success: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private borrowService: BorrowService,
    private memberStatusDictionary: MemberStatusDictionary
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const response = await this.borrowService.getMemberWithNumberOfCurrentBorrows(id);
    
    this.success = response.success;
    if (response.data) {
      this.memberBorrows = response.data;
    }
    /**
     * TODO: Change the status from select list to Angular Pipes(?); Change so it cannot be switched.
     */
  }

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
