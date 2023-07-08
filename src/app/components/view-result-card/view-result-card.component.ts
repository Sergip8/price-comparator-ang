import { Component, Input, OnInit } from '@angular/core';
import { BasicData } from '../../models/basic-data';

@Component({
  selector: 'view-result-card',
  templateUrl: './view-result-card.component.html',
  styleUrls: ['./view-result-card.component.css']
})
export class ViewResultCardComponent implements OnInit {

  @Input() data!: any
  @Input() baseUrl: string = ""
  constructor() { }

  ngOnInit(): void {
  }

}

