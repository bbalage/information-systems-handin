import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Borrowable } from 'src/app/models/borrowable';
import { MemberBorrows } from 'src/app/models/memberBorrows';
import { BorrowService } from 'src/app/services/borrow.service';
import { BorrowableService } from 'src/app/services/borrowable.service';

@Component({
  selector: 'app-borrow-screen',
  templateUrl: './borrow-screen.component.html',
  styleUrls: ['./borrow-screen.component.css']
})
export class BorrowScreenComponent implements OnInit {

  success: boolean = true;
  stillAllowedBorrows!: number;
  
  toCart: Subject<Borrowable> = new EventEmitter();
  fromCart: Subject<Borrowable> = new EventEmitter();

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
    private router: Router
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const response = await this.borrowService.getMemberWithNumberOfCurrentBorrows(id);
    
    this.success = response.success;
    if (response.data) {
      this.memberBorrows = response.data;
    }

    this.stillAllowedBorrows = this.memberBorrows.numberOfStillAllowedBorrows;
  }

  sendToCart (borrowable: Borrowable) {
    this.toCart.next(borrowable);
    this.stillAllowedBorrows--;
  }

  sendToList (borrowable: Borrowable) {
    this.fromCart.next(borrowable);
    this.stillAllowedBorrows++;
  }

  borrow(serialNumbers: number[]) {
    this.borrowService.borrow(this.memberBorrows.id, serialNumbers);
    this.router.navigateByUrl("/borrow")
  }

}
