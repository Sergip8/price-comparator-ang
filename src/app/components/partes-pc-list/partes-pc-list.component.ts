import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PartesPc } from 'src/app/models/partes-pc';
import { PartesPcData } from 'src/app/models/partes-pc-data';

@Component({
  selector: 'app-partes-pc-list',
  templateUrl: './partes-pc-list.component.html',
  styleUrls: ['./partes-pc-list.component.css']
})
export class PartesPcListComponent {
  @Input() partesPc: PartesPcData
  currentRoute: string;

  constructor(private router: Router){
    this.currentRoute = new URL(window.location.href).pathname
  }
  
  routeToDetails(data: PartesPcData) {
    
    this.router.navigate([`/${this.currentRoute.split("/")[1]}/product-details/`+data.id],{
      state:{
        data: data
      }
    })
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

}
