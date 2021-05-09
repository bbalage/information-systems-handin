import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MergedBorrowableBorrowAndMember } from 'src/app/models/merged';
import { BorrowService } from 'src/app/services/borrow.service';

@Component({
  selector: 'app-bring-back',
  templateUrl: './bring-back.component.html',
  styleUrls: ['./bring-back.component.css']
})
export class BringBackComponent implements OnInit {

  mergedData: MergedBorrowableBorrowAndMember = {
    member: {
      id: 0,
      name: '',
      idCardNumber: '',
      phoneNumber: '',
      address: '',
      status: ''
    },
    borrow: {
      borrowId: 0,
      returned: false,
      dateOfBorrow: new Date()
    },
    borrowable: {
      serialNumber: 0,
      title: '',
      author: '',
      type: '',
      acquirementDate: new Date(),
      maxBorrowTime: 0,
      status: ''
    }
  };

  constructor(
    private borrowService: BorrowService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    const serialNumber = this.route.snapshot.params['serialNumber'];

    const response = await this.borrowService.getMerged(serialNumber);
    if (response.data) {
      this.mergedData = response.data;
    }
  }

  async bringBack(serialNumber: number) {
    await this.borrowService.free(serialNumber);
    this.router.navigateByUrl("/borrow");
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
