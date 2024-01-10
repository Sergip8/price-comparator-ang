import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TecDataResponse, TecDataResponseUnified } from 'src/app/models/tec-data-response';
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



  productId: string
  productData = []
  productName = ""
  productDescription: any
  productList: TecDataResponse[]
  product: TecDataResponseUnified
  stores: TecDataResponse[]
  typePath = ""
  currentRoute: string;
  productFavoriteIcon = true
  favorities: number[]
  isFavoriteSelected: boolean
  isPartesPc: boolean
  
  constructor(private activatedRoute: ActivatedRoute, 
    private productdetail: ProductDetailService, 
    private searchService: SearchService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router){
    this.currentRoute = new URL(window.location.href).pathname
    this.activatedRoute.params.subscribe((params) => {
      this.typePath = params["type"]
     
      if(params["id"])
      this.productId = params["id"]
    if(params["name"])
    this.productName = params["name"]
    })
    this.product = router.getCurrentNavigation().extras?.state?.["data"]
    this.isPartesPc = router.getCurrentNavigation().extras?.state?.["isPartesPc"]

    if(this.isPartesPc){
      this.getPartesPcRelated()
    }else{
      
      if(!this.product){
        productdetail.getProductById(this.productId).subscribe({
          next: product =>{ this.product = product
       
          this.getRelatedProducts()
        }
  
        })
      }else{
        this.getRelatedProducts()
  
      }
      }

    if (this.productName)
    this.productName = this.product.name.split(' ').slice(0,2).join(' ')
   
   

  }
  ngOnInit(): void {
    this.getproductHistory()
    
    this.authService.authState$.subscribe(user =>{
   
      this.getStores()
      if(user){
      // this.userService.getUserFavorites(this.authService.getEmail()).subscribe({
      //   next: favorities => {
      //     this.favorities = favorities
      //     this.isFavorite(this.product.id)
      //   }
      // })
      this.favorities = this.userService.getFavoriteCookie()
    
      this.isFavorite(this.product.id)
      this.getUserFavorites()
      }
    })
  }

  getproductHistory(){
  
   
    this.productdetail.getProductHistory(this.productId).subscribe({
      next: data => {
      
        if(data){
          let prices = data["price"].split(",").map(Number) 
          let dates = data["scrap_date"].split(",")
          
      
  
          for (let i = 0; i<dates.length; i++){
            const obj = {};
            obj["y"] = prices[i];
            obj["x"] = dates[i]
            this.productData.push(obj)

        }
        }   
      },error: e =>{
          console.log(e)
      }
      
    })
   
  }

  getRelatedProducts(){
   
      this.searchService.getRelatedProducts(this.product.category).subscribe({
        next: data =>{
          console.log(data)
          this.productList = data}
      })
    

  }
  getPartesPcRelated(){
    this.searchService.getRelatedPartesPc(this.product.category).subscribe({
      next: data => this.productList = data
    })
  }

  validateType(): boolean{
  
    return typeof(this.productDescription) === 'object'
  }
  favoriteSelected(id: number) {


    this.authService.authState$.subscribe( user =>{
      
         this.userService.setUserFavorite(user.uid, id).subscribe({
        next: favorities => {
          this.favorities = favorities
          this.isFavorite(id)
        }
      })
    })

    }
    
    // if(this.authService.loggedIn()){

    //   const fav = this.userService.getFavoriteCookie()
    //   const index = fav.indexOf(id)
    //   if(index !== -1){
    //     fav.splice(index, 1)
    //   }
    //   else{
    //     fav.push(id)
    //   }
    //   this.userService.setFavoriteCookie(fav)
    //   this.favorities = this.userService.getFavoriteCookie()
      
    //   this.isFavorite(this.product.id)
    //   // console.log("3#eeeeentro favoritos")
    //   // this.userService.setUserFavorite(this.authService.getEmail(), id).subscribe({
    //   //   next: favorities => {
    //   //     this.favorities = favorities
    //   //     this.isFavorite(id)
    //   //   }
    //   // })
      
     
    // }
    

    getUserFavorites(){
      this.authService.authState$.subscribe( user =>{
      this.userService.getUserFavorites(user.uid).subscribe({
        next: favorites => {
          this.favorities = favorites
          this.isFavorite(this.product.id)
        }
      })
      })
    }
    isFavorite(productId: number) {
      this.isFavoriteSelected = this.favorities ? this.favorities.includes(productId): false
   
    }
    getStores(){
      this.searchService.getStores(this.product.ids).subscribe({
        next: stores =>{ this.stores = stores}
      })
    }

}
