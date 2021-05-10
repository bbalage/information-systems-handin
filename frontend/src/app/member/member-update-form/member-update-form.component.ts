import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { MemberQueryObject } from '../member-search/member-query-object';

@Component({
  selector: 'app-member-update-form',
  templateUrl: './member-update-form.component.html',
  styleUrls: ['./member-update-form.component.css']
})
export class MemberUpdateFormComponent implements OnInit {

  memberUpdateForm: FormGroup = this.formbuilder.group({
    name: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\+[0-9 ]+[0-9]$/)]],
    idCardNumber: ['', [Validators.required, Validators.pattern(/^[1-9a-zA-Z]+$/), 
      Validators.minLength(8), Validators.maxLength(8)]],
    address: ['', Validators.required],
    status: ['', Validators.required]
  });

  member: Member = {
    id: 0,
    name: '',
    idCardNumber: '',
    phoneNumber: '',
    address: '',
    status: ''
  };
  success: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private formbuilder: FormBuilder,
    private router: Router
  ) { }

  async ngOnInit() {
    const searchParams = new MemberQueryObject();
    searchParams.id = this.route.snapshot.params['id'];
    const response = await this.memberService.searchMembers(searchParams);
    this.success = response.success;

    if (response.data){
      this.member = response.data[0];
    }
  }

  async updateMember() {
    await this.memberService.updateMember(this.member);
    this.router.navigateByUrl('/member');
  }

}
