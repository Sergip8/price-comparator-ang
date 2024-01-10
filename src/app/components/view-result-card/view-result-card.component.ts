import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BasicData } from '../../models/basic-data';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';

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
  @Input() isPartesPc: boolean
  productName = ""

  @Output() scroll_value = new EventEmitter<number>()
 

  style = {'width': '80px;',
  'height': '150px;'}
  currentRoute: string;
  constructor(private router: Router) { 
    this.currentRoute = new URL(window.location.href).pathname
  }
  ngOnInit(): void {
   
  }

  changeName(name: string):string{
    for (let i = 0; i < name.length; i++) {
      if(i >20){
        if(name[i] == " "){
          name = name.slice(0, i)+"<br>"+name.slice(i)
          break
        }
      }
   }
   return name
  }

  getDiscount(price: number, listPrice: number):string{

    if(listPrice>price)
  return "-"+ Math.round(((listPrice- price)/listPrice)*100)+"%"
  else
  return ""
  }

  routeToDetails(data: any){
    console.log(data)
    this.router.navigate([`/product-details/`+data.id],{
      state:{
        data: data,
        isPartesPc: this.isPartesPc
      }
    })
  }
  getNameImage(id: string): string{
    const id_split = id.split("-")[0]
    switch(id_split){
      case "F": return "Falabella"
      case "A": return "Alkosto"
      case "E": return "Exito"
      case "J": return "Jumbo"
      case "O": return "Olimpica"
      case "L": return "Linio"
      default: return ""
    }
    
  }
}
