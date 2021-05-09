import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberStatusDictionary } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-create-form',
  templateUrl: './member-create-form.component.html',
  styleUrls: ['./member-create-form.component.css']
})
export class MemberCreateFormComponent implements OnInit {

  memberCreateForm: FormGroup = this.formbuilder.group({
    name: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\+[0-9 ]+[0-9]$/)]],
    idCardNumber: ['', [Validators.required, Validators.pattern(/^[1-9a-zA-Z]+$/), 
      Validators.minLength(8), Validators.maxLength(8)]],
    address: ['', Validators.required],
  });

  memberStatusDictionary: MemberStatusDictionary = new MemberStatusDictionary();

  constructor(
    private memberService: MemberService,
    private formbuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  async createMember() {
    const member = this.memberCreateForm.value;
    await this.memberService.createMember(member);
    this.router.navigateByUrl('/member');
  }

}
