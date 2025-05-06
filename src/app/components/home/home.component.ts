import { Component, OnInit } from '@angular/core';
import { PartesPcData } from 'src/app/models/partes-pc-data';
import { TecDataResponse } from 'src/app/models/tec-data-response';
import { AuthAltasService } from 'src/app/service/auth-atlas.service';

import { PartesPcService } from 'src/app/service/partes-pc.service';
import { ProductAtlasService } from 'src/app/service/product-atlas.service';
import { SearchService } from 'src/app/service/search.service';
import { UserService } from 'src/app/service/user.service';
import { CarouselImg } from './carousel';
import { MenuService, StoreType } from 'src/app/service/menu-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productsDiscount: TecDataResponse[]
  partesPc: TecDataResponse[]
  newFavorities: number[]
  carouselImg: CarouselImg[]
  isLoading: boolean = true;

  constructor(
    private searchService: ProductAtlasService,
    private menuService: MenuService,
    private router: Router,
    private auth: AuthAltasService,
    private partesPcService: PartesPcService){
    
    
  }
  ngOnInit(){
   
// if(!this.auth.getToken()){
//   this.auth.token.subscribe((t) => {
//     if(t){
//       this.partesPcService.getPartesPcSample().subscribe({
//             next: data => this.partesPc = data
//           })
//           this.getDiscountTecProducts()

//     }
//   })

// }else
  this.partesPcService.getPartesPcSample().subscribe({
    next: data => this.partesPc = data
  })
  this.getDiscountTecProducts()
  this.getCarouselImages()

    //this.getPartesPcSample()
   //this.getMenuCategories()
   // this.authService.verifyToken()

  //   const fav =this.userService.getFavoriteCookie()
  //   if(fav.length > 0){
  // this.userService.syncFavorities(this.authService.getEmail(), fav).subscribe()
  //   }
  //   else{
  //    this.userService.getUserFavorites(this.authService.getEmail()).subscribe({
  //     next: favorites => this.userService.setFavoriteCookie(favorites) 
  //    })
  //   }


    // this.userService.getUserFavorites(this.authService.getEmail()).subscribe({
    //   next: favorities => {
    //    //const fav =this.userService.getFavoriteCookie
       
    //     //this.userService.setFavoriteCookie(favorities)
    //   }
    // })
  }
  getCarouselImages(){
    this.searchService.getCarouselImages().subscribe({
      next: data => {
        this.carouselImg = data
        console.log(data)
      }
    })
  }

  getDiscountTecProducts(){
    this.searchService.getDiscountTecProducts("tecnologia/tv-audio-y-video/televisores").subscribe({
      next: data => {this.productsDiscount = data
      console.log(data)}
    })
  }
  // getPartesPcSample(){
  //   this.partesPcService.getPartesPcSample().subscribe({
  //     next: data => this.partesPc = data
  //   })
  // }
//  async getPartesPcSample(){
  
//     await this.partesPcService.getPartesPcHome().then(data =>{
//       this.partesPc = data
//     })
//   }

syncFavorities(){
  
}
navigateTo(cat: String) {
  if(cat.startsWith("partes-pc")){
      this.menuService.updateStoreTypeState(StoreType.PARTES_PC)
  }else
      this.menuService.updateStoreTypeState(StoreType.GRANDES_SUPERFICIES)
      
  this.router.navigateByUrl('/categoria/'+cat.toLowerCase())
}


}
