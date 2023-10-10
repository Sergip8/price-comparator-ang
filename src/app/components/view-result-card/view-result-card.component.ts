import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BasicData } from '../../models/basic-data';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'view-result-card',
  templateUrl: './view-result-card.component.html',
  styleUrls: ['./view-result-card.component.css']
})
export class ViewResultCardComponent implements OnInit {

  @Input() data!: any
  @Input() baseUrl: string = ""
  @Input() store: string = ""
  @Input() styles: any

  @Output() scroll_value = new EventEmitter<number>()
 

  style = {'width': '80px;',
  'height': '150px;'}
  constructor() { 

  }


  ngOnInit(): void {
   
  }
  getDiscount(price: number, listPrice: number):string{

    if(listPrice>price)
  return "-"+ Math.round(((listPrice- price)/listPrice)*100)+"%"
  else
  return ""
  }


}
