import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../models/member';
import { MemberService } from '../services/member.service';
import { MemberQueryObject } from './member-search/member-query-object';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  members: Member[] = [];
  success: boolean = true;
  msg: string = '';

  constructor(
    private memberService: MemberService,
    private router: Router
    ) { }

  async ngOnInit() {
    this.fetchMembers();
  }

  async fetchMembers() {
    const response = await this.memberService.searchMembers();
    this.success = response.success;
    
    this.members = response.data ? response.data : this.members;
  }

  async searchMembers(searchQuery: MemberQueryObject) {
    const response = await this.memberService.searchMembers(searchQuery)
      .catch(msg => {
      this.success = false;
      this.msg = msg.error.message;
    });
  if (response){
    this.success = response.success;

    this.members = response.data ? response.data : this.members;
  };
  }

  navigateToNewMemberForm() {
    this.router.navigateByUrl('/member/create');
  }

  navigateToUpdateMemberForm(id: number) {
    this.router.navigate(['/member/update', id]);
  }

  deleteMember(member: Member) {
    this.memberService.deleteMember(member.id);
    member.status = 'i';
  }

  activateMember(member: Member) {
    this.memberService.activateMember(member.id);
    member.status = 'a';
  }

  startBorrow(id: number) {
    this.router.navigate(['/borrow', id]);
  }

}
