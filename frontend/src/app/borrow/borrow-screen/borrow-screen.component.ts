import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberBorrows } from 'src/app/models/memberBorrows';
import { BorrowService } from 'src/app/services/borrow.service';

@Component({
  selector: 'app-borrow-screen',
  templateUrl: './borrow-screen.component.html',
  styleUrls: ['./borrow-screen.component.css']
})
export class BorrowScreenComponent implements OnInit {

  success: boolean = true;

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

  constructor(
    private route: ActivatedRoute,
    private borrowService: BorrowService,
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const response = await this.borrowService.getMemberWithNumberOfCurrentBorrows(id);
    
    this.success = response.success;
    if (response.data) {
      this.memberBorrows = response.data;
    }
  }

}
