import { Component, OnInit } from '@angular/core';
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

  constructor(private memberService: MemberService) { }

  async ngOnInit() {
    const response = await this.memberService.loadMembers();
    this.success = response.success;
    this.members = response.data;
  }

}
