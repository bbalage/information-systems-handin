import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Member } from '../models/member';
import { HttpContainer } from '../models/httpResponse'
import { MemberQueryObject } from '../member/member-search/member-query-object';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  async searchMembers (searchParams?: MemberQueryObject | undefined) {
    if (searchParams) {
      const queryString = this.searchParamsToQueryString(searchParams);
      return this.http.get<HttpContainer<Member[]>>(`api/members${queryString}`).toPromise();
    }
    return this.http.get<HttpContainer<Member[]>>(`api/members`).toPromise();
  }

  async createMember (member: Member) {
    return this.http.post<Member>('/api/members/create', member).toPromise();
  }

  private searchParamsToQueryString (searchParams: MemberQueryObject): string {
    let queryString: string = '';
    if (searchParams.id) {
      queryString += `&id=${searchParams.id}`;
    }
    if (searchParams.name) {
      queryString += `&name=${searchParams.name}`;
    }
    if (searchParams.idCardNumber) {
      queryString += `&idCardNumber=${searchParams.idCardNumber}`;
    }
    queryString = '?'.concat(queryString.substring(1));
    return queryString;
  }
}

