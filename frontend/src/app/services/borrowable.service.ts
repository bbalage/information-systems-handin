import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BorrowableQueryObject } from '../borrowable/borrowable-search/borrowable-query-object';
import { Borrowable } from '../models/borrowable';
import { HttpContainer } from '../models/httpResponse';

@Injectable({
  providedIn: 'root'
})
export class BorrowableService {

  constructor(
    private http: HttpClient
    ) { }

  async searchBorrowables (searchParams?: BorrowableQueryObject | undefined) {
    if (searchParams) {
      const queryString = this.searchParamsToQueryString(searchParams);
      return this.http.get<HttpContainer<Borrowable[]>>(`api/borrowables${queryString}`).toPromise();
    }
    return this.http.get<HttpContainer<Borrowable[]>>(`api/borrowables`).toPromise();
  }

  async createBorrowable (borrowable: Borrowable) {
    return this.http.post<Borrowable>('/api/borrowables/create', borrowable).toPromise();
  }

  async updateBorrowable (borrowable: Borrowable) {
    this.http.put<Borrowable>(`api/borrowables/update/${borrowable.serialNumber}`, borrowable).toPromise();
  }

  async deleteBorrowable (serialNumber: number) {
    this.http.delete<Borrowable>(`api/borrowables/delete/${serialNumber}`).toPromise();
  }

  private searchParamsToQueryString (searchParams: BorrowableQueryObject): string {
    let queryString: string = '';
    if (searchParams.title) {
      queryString += `&title=${searchParams.title}`;
    }
    if (searchParams.author) {
      queryString += `&author=${searchParams.author}`;
    }
    queryString = '?'.concat(queryString.substring(1));
    return queryString;
  }
}
