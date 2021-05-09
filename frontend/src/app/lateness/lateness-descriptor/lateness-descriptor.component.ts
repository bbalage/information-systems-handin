import { Component, Input, OnInit } from '@angular/core';
import { Lateness } from 'src/app/models/merged';

@Component({
  selector: 'app-lateness-descriptor',
  templateUrl: './lateness-descriptor.component.html',
  styleUrls: ['./lateness-descriptor.component.css']
})
export class LatenessDescriptorComponent implements OnInit {

  @Input()
  lateness!: Lateness;

  constructor() { }

  ngOnInit(): void {
  }

  typeConvert(type: string): string {
    switch(type) {
      case 'b':
        return "Book";
      case 'c':
        return "CD";
      case 'm':
        return "Music Sheet";
      default:
        return "";
    }
  }
}
