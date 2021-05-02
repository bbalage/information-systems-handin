import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Borrowable } from 'src/app/models/borrowable';
import { BorrowableService } from 'src/app/services/borrowable.service';
import { BorrowableQueryObject } from '../borrowable-search/borrowable-query-object';

@Component({
  selector: 'app-borrowable-update-form',
  templateUrl: './borrowable-update-form.component.html',
  styleUrls: ['./borrowable-update-form.component.css']
})
export class BorrowableUpdateFormComponent implements OnInit {

  success: boolean = true;
  borrowable: Borrowable = {
    serialNumber: 0,
    title: '',
    author: '',
    maxBorrowTime: 0,
    type: 'b',
    acquirementDate: new Date(),
    status: 'f'
  }

  borrowableUpdateForm: FormGroup = this.formbuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    maxBorrowTime: [0, [Validators.required, Validators.min(0)]],
    type: ['b', Validators.required],
    acquirementDate: [new Date(), Validators.required],
    status: ['f', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private borrowableService: BorrowableService,
    private formbuilder: FormBuilder,
    private router: Router
  ) { }

  async ngOnInit() {
    const searchParams = new BorrowableQueryObject();
    searchParams.serialNumber = this.route.snapshot.params['serialNumber'];
    const response = await this.borrowableService.searchBorrowables(searchParams);
    this.success = response.success;

    if (response.data){
      this.borrowable = response.data[0];
    }
  }

  updateBorrowable() {
    this.borrowableService.updateBorrowable(this.borrowable);
    this.router.navigateByUrl('/borrowable');
  }

}
