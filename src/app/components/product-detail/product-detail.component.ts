import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TecDataResponse } from 'src/app/models/tec-data-response';
import { AuthService } from 'src/app/service/auth.service';
import { ProductDetailService } from 'src/app/service/product-detail.service';
import { SearchService } from 'src/app/service/search.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {



  productId: number
  productData = []
  productName = ""
  productDescription: any
  productList: TecDataResponse[]
  product: TecDataResponse
  typePath = ""
  currentRoute: string;
  productFavoriteIcon = true
  favorities: number[]
  isFavoriteSelected: boolean
  
  constructor(private activatedRoute: ActivatedRoute, 
    private productdetail: ProductDetailService, 
    private searchService: SearchService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router){
    this.currentRoute = new URL(window.location.href).pathname
    this.activatedRoute.params.subscribe((params) => {
      this.typePath = params["type"]
      console.log(this.typePath)
      if(params["id"])
      this.productId = params["id"]
    if(params["name"])
    this.productName = params["name"]
    })
    this.product = router.getCurrentNavigation().extras.state["data"]
    this.productName = this.product.name.split(' ').slice(0,2).join(' ')
    console.log(this.product)
    this.getproductHistory()
    this.getRelatedProducts()
  }
  ngOnInit(): void {
    if(this.authService.loggedIn()){
    // this.userService.getUserFavorites(this.authService.getEmail()).subscribe({
    //   next: favorities => {
    //     this.favorities = favorities
    //     this.isFavorite(this.product.id)
    //   }
    // })
    this.favorities = this.userService.getFavoriteCookie()
    console.log(this.favorities)
    this.isFavorite(this.product.id)
    }
  }

  getproductHistory(){
    console.log(this.productId)
   
    this.productdetail.getProductHistory(this.productId, this.typePath).subscribe({
      next: data => {
        console.log(data)
        let prices = data["price"].split(",").map(Number) 
        let dates = data["scrap_date"].split(",")
        
        if(data.specification){

          if(!data.specification.includes("<div>")){
            this.productDescription = data.specification.split(/,(?![0-9])/)
          }
          else {
            //this.productDescription = data.specification.split("</div><div>,")
            this.productDescription = data.specification.replaceAll("</div><div>", "").split(/,(?![ 0-9])/)
          }
          console.log(this.productDescription)
        }
        
        const obj = {};

        for (let i = 0; i<dates.length; i++){
          const obj = {};
          obj["y"] = prices[i];
          obj["x"] = dates[i]
          this.productData.push(obj)
        }   
      },error: e =>{
          console.log(e)
      }
      
    })
   
  }

  getRelatedProducts(){
    console.log(this.productName)
   
      this.searchService.getRelatedProducts(this.productName, this.typePath).subscribe({
        next: data =>{
          console.log(data)
          this.productList = data}
      })
    

  }
  validateType(): boolean{
    console.log(typeof(this.productDescription))
    return typeof(this.productDescription) === 'object'
  }
  favoriteSelected(id: number) {
    console.log(this.authService.loggedIn())
    if(this.authService.loggedIn()){

      const fav = this.userService.getFavoriteCookie()
      const index = fav.indexOf(id)
      if(index !== -1){
        fav.splice(index, 1)
      }
      else{
        fav.push(id)
      }
      this.userService.setFavoriteCookie(fav)
      this.favorities = this.userService.getFavoriteCookie()
      
      this.isFavorite(this.product.id)
      // console.log("3#eeeeentro favoritos")
      // this.userService.setUserFavorite(this.authService.getEmail(), id).subscribe({
      //   next: favorities => {
      //     this.favorities = favorities
      //     this.isFavorite(id)
      //   }
      // })
      
     
    }
    }
    isFavorite(productId: number) {
      this.isFavoriteSelected = this.favorities ? this.favorities.includes(productId): false
      console.log(this.isFavoriteSelected)
    }

}
