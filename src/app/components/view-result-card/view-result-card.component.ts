import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BasicData } from '../../models/basic-data';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

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
  @Input() isFavoriteView: boolean
  productName = ""

  @Output() scroll_value = new EventEmitter<number>()

  @Output() favoriteSelectedEmit = new EventEmitter<string[]>()
 
  favoriteSelected: string[] = []
  style = {'width': '80px;',
  'height': '150px;'}
  currentRoute: string;
  constructor(private router: Router, private userService: UserService) { 
    this.currentRoute = new URL(window.location.href).pathname
  }
  ngOnInit(): void {
   
  }
  selectFavorite(favorite: string) {
   let favorites = []
   this.userService.favoriteSelected$.subscribe(f => {
    favorites = f
   })
   
   const index = favorites.indexOf(favorite)
   if(index === -1){
     console.log(index)
     favorites.push(favorite)
    }else{
      favorites.splice(index, 1)
    }
   
    
   this.favoriteSelectedEmit.emit(favorites)
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
    this.router.navigate([`/product-details/`+data._id],{
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
