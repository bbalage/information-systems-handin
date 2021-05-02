import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MemberBorrows } from '../models/memberBorrows';
import { HttpContainer } from '../models/httpResponse';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(
    private http: HttpClient
  ) { }

  async getMemberWithNumberOfCurrentBorrows(id: number) {
    return this.http.get<HttpContainer<MemberBorrows>>(`/api/borrow/member-data/${id}`).toPromise();
  }
}
