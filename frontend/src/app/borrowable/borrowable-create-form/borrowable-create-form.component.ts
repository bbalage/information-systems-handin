import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BorrowableService } from 'src/app/services/borrowable.service';

@Component({
  selector: 'app-borrowable-create-form',
  templateUrl: './borrowable-create-form.component.html',
  styleUrls: ['./borrowable-create-form.component.css']
})
export class BorrowableCreateFormComponent implements OnInit {

  borrowableCreateForm: FormGroup = this.formbuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    maxBorrowTime: [0, [Validators.required, Validators.min(0)]],
    type: ['b', Validators.required],
    acquirementDate: [new Date(), Validators.required],
  });

  constructor(
    private borrowableService: BorrowableService,
    private formbuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  createBorrowable() {
    const borrowable = this.borrowableCreateForm.value;
    this.borrowableService.createBorrowable(borrowable);
    this.router.navigateByUrl('/borrowable');
  }

}
