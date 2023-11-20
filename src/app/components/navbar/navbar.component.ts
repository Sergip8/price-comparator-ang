import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TecDataResponse } from 'src/app/models/tec-data-response';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu-service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuCategories = {}
  categoryList = []
  showLogin = false
  favoriteProducts: TecDataResponse[] 
  menuList:any
  showFavorites = false

  constructor(public menuService: MenuService, private userSevice: UserService, private router: Router, public auth: AuthService){
    menuService.categories.subscribe(c => this.menuCategories = c)
    this.menuList = menuService.tecnologia
    console.log("######pasa#######")
    menuService.getMenuCategories()
  }
  ngOnInit(): void {
    
  }
  catSelected(cat: string){
    console.log(cat)
  }
  navigateTo(...link: string[]){
    //this.menuService.categoryLink.next(link.join("/"))
    
      this.router.navigateByUrl('/tecnologia/categoria/'+(link.join("/").toLowerCase()))
  }

  getFavorites(){
    if(this.auth.loggedIn()){
      this.showFavorites = !this.showFavorites
    this.getUserFavoriteProducts()

    }
  }

  removeFavorites(id: number) {
    console.log(id)
    this.userSevice.removeFavorite(id).subscribe({
      next: () => {
        this.removeFavorites(id)
        this.userSevice.removeFavoriteIdCookie(id)
        this.getUserFavoriteProducts()
      }
    })
    }

    getUserFavoriteProducts(){
        
      this.userSevice.getFavoriteProducts(this.auth.getEmail()).subscribe({
        next: products => {
          this.favoriteProducts = products
          
        }
      })
    }
  

}
