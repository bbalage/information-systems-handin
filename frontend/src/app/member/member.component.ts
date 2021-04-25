import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../models/member';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  members: Member[] = [];
  success: boolean = true;

  constructor(
    private memberService: MemberService,
    private router: Router
    ) { }

  async ngOnInit() {
    this.fetchMembers();
  }

  private async fetchMembers() {
    const response = await this.memberService.loadMembers();
    this.success = response.success;
    
    this.members = response.data ? response.data : this.members;
  }

  navigateToNewMemberForm() {
    this.router.navigateByUrl('/member/create');
  }

}
