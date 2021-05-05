import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpContainer } from '../models/httpResponse';
import { Lateness } from '../models/merged';

@Injectable({
  providedIn: 'root'
})
export class LatenessService {

  constructor(
    private http: HttpClient
  ) { }

  async getLateness() {
    return this.http.get<HttpContainer<Lateness[]>>('api/lateness').toPromise();
  }
}
