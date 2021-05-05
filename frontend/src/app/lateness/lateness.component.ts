import { Component, OnInit } from '@angular/core';
import { Lateness } from '../models/merged';
import { LatenessService } from '../services/lateness.service';

@Component({
  selector: 'app-lateness',
  templateUrl: './lateness.component.html',
  styleUrls: ['./lateness.component.css']
})
export class LatenessComponent implements OnInit {

  latenesses: Lateness[] = [];

  constructor(
    private latenessService: LatenessService
  ) { }

  async ngOnInit() {
    const response = await this.latenessService.getLateness();

    if(response.data) {
      this.latenesses = response.data;
    }
    console.log(this.latenesses);
  }

}
