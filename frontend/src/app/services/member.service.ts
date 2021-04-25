import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Member } from '../models/member';
import { HttpContainer } from '../models/httpResponse'

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  async loadMembers () {
    return this.http.get<HttpContainer<Member[]>>('api/members').toPromise();
  }

  async createMember (member: Member) {
    return this.http.post<Member>('/api/members/create', member).toPromise();
  }
}
