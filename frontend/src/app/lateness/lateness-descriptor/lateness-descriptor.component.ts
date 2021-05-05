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

}
