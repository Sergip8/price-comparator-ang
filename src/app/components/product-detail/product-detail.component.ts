import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryChart } from 'src/app/models/product-history';
import { TecDataResponse, TecDataResponseUnified } from 'src/app/models/tec-data-response';
import { AuthAltasService } from 'src/app/service/auth-atlas.service';
import { ProductAtlasService } from 'src/app/service/product-atlas.service';
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
  productData: HistoryChart[]
  productName = ""
  productDescription: any
  productList: TecDataResponse[]
  product: TecDataResponseUnified
  stores: TecDataResponse[]
  typePath = ""
  currentRoute: string;
  productFavoriteIcon = true
  favorities: string[]
  isFavoriteSelected: boolean
  isPartesPc: boolean
  
  constructor(private activatedRoute: ActivatedRoute, 
    private productdetail: ProductDetailService, 
    private productService: ProductAtlasService,
    private userService: UserService,
    private auth: AuthAltasService,
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
    this.isPartesPc = this.product.category.startsWith("partes-pc")
    console.log(this.product)
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
  async ngOnInit() {
    console.log(this.isPartesPc)
    this.auth.refreshUser
    this.auth.getCurrentUser()
   
      this.getproductHistory()
      
      this.getStores()
      
      if(this.auth.getCurrentUser()?.isLoggedIn){
        this.getUserFavorites()
        // this.userService.getUserFavorites(this.authService.getEmail()).subscribe({
      //   next: favorities => {
      //     this.favorities = favorities
      //     this.isFavorite(this.product.id)
      //   }
      // })
      
      
      
      }
    
  }

  getproductHistory(){
      this.productdetail.getProductsHistory(this.product.ids, this.product.category).subscribe({
        next: data => {
          if(data){
            console.log(data)
            this.productData = data
            if(this.productData.length>1){
             this.productData.forEach((pd, i) => {
               let list = this.productData[(this.productData.length-1)-i].data.map(objeto => objeto.x);
               this.productData[i].data = pd.data.filter(objeto => list.includes(objeto.x));
             })
            }
            
          }          
        },error: e =>{
            console.log(e)
        }
      })
  }

  getRelatedProducts(){
   
      this.productService.getRelatedProducts(this.product.category).subscribe({
        next: data =>{
          console.log(data)
          this.productList = data}
      })

  }
  getPartesPcRelated(){
    this.productService.getRelatedPartesPc(this.product.category).subscribe({
      next: data => this.productList = data
    })
  }

  validateType(): boolean{
  
    return typeof(this.productDescription) === 'object'
  }
  favoriteSelected(id: string) {
    const user:Realm.User = this.auth.getCurrentUser()
    console.log(user)
      if(user){
         if(this.auth.tokenExpired(user.accessToken)){
          this.auth.refreshUser()
        }
         this.userService.setUserFavorite(user.id, [id], user.accessToken).subscribe({
        next: favorities => {
         this.userService.setLocalFavorites(id)
          this.isFavorite(id)
        },error: e => console.log(e)
      })
    }
    }

    getUserFavorites(){
      
      const user:Realm.User = this.auth.getCurrentUser()
      if(user){
        if(this.auth.tokenExpired(user.accessToken)){
          this.auth.refreshUser()
        }

        this.userService.getUserFavorites(user.id, user.accessToken).subscribe({
          next: favorites => {
            console.log(favorites)
            this.userService.syncLocalFav(favorites)
            this.isFavorite(this.product._id)
          }
        })
      }else{
      }
    }
    isFavorite(productId: string) {
      console.log(productId)
      this.isFavoriteSelected = this.userService.getLocalFavorites().includes(productId)
   
    }
    getStores(){
      
      if(this.product.ids)
      this.productService.getStores(this.product.ids).subscribe({
        next: stores =>{ 
          this.stores = stores
          this.stores.sort((a, b) => {
            if (a.price < b.price) return -1;
            if (a.price > b.price) return 1;
            return 0;
        });
        }
      })
    }

}
