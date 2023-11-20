import { Component, OnInit } from '@angular/core';
import { PartesPcData } from 'src/app/models/partes-pc-data';
import { TecDataResponse } from 'src/app/models/tec-data-response';
import { AuthService } from 'src/app/service/auth.service';
import { PartesPcService } from 'src/app/service/partes-pc.service';
import { SearchService } from 'src/app/service/search.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productsDiscount: TecDataResponse[]
  partesPc: PartesPcData[]
  newFavorities: number[]


  constructor(private authService: AuthService, 
    private searchService: SearchService,
    private userService: UserService,
    private partesPcService: PartesPcService){
    this.getDiscountTecProducts()
    this.getPartesPcSample()
  }
  ngOnInit(): void {
   // this.authService.verifyToken()
    const fav =this.userService.getFavoriteCookie()
    if(fav.length > 0){
  this.userService.syncFavorities(this.authService.getEmail(), fav).subscribe()
    }
    else{
     this.userService.getUserFavorites(this.authService.getEmail()).subscribe({
      next: favorites => this.userService.setFavoriteCookie(favorites) 
     })
    }
    // this.userService.getUserFavorites(this.authService.getEmail()).subscribe({
    //   next: favorities => {
    //    //const fav =this.userService.getFavoriteCookie
       
    //     //this.userService.setFavoriteCookie(favorities)
    //   }
    // })
  }

  getDiscountTecProducts(){
    this.searchService.getDiscountTecProducts("televisores").subscribe({
      next: data => {this.productsDiscount = data
      console.log(this.productsDiscount)}
    })
  }
  getPartesPcSample(){
    this.partesPcService.getPartesPcSample().subscribe({
      next: data => this.partesPc = data
    })
  }

syncFavorities(){

}

}
