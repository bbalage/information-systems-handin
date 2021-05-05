import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MemberBorrows } from '../models/memberBorrows';
import { HttpContainer } from '../models/httpResponse';
import { Borrowable } from '../models/borrowable';

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

  async borrow(id: number, serialNumbers: number[]) {
    return this.http.post<number[]>(`api/borrow/create/${id}`, serialNumbers).toPromise();
  }

  async getBorrows() {
    return this.http.get<HttpContainer<Borrowable[]>>(`/api/borrow`).toPromise();
  }
}
