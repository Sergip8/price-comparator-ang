import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { TecDataResponse } from "src/app/models/tec-data-response";
import { AuthAltasService, SignInUp } from "src/app/service/auth-atlas.service";

import { UserService } from "src/app/service/user.service";

@Component({
    selector: 'user-buttoms',
    template: `
  <div class="header-user-actions">
        <div 
          clickOutside
          (onClickOutside)="showLogin = false"
          openModal
          [appOscurecerPagina]="showLogin"
        >
          <button *ngIf="!user" class="action-btn" (click)="showLogin = !showLogin">
          <!-- <span [ngClass]="showLogin? 'login-selected': ''"]>Ingresar</span> -->
            <mat-icon fontIcon="person"></mat-icon>
          </button>

          <div *ngIf="showLogin" class="auth">
            <app-login
              *ngIf="flag"
              (loginOK)="onClickRegister($event)"
              (signup)="flag = false"
            ></app-login>
            <app-register
              *ngIf="!flag"
              (signinOK)="onClickRegister($event)"
              (Signin)="flag = true"
            ></app-register>
          </div>
        </div>
        <div *ngIf="user">
          <button (click)="logOut()" class="btn btn-outline btn-light">Salir</button>
      </div>

        <button class="action-btn">
          <mat-icon fontIcon="notifications"></mat-icon>

          <span class="count">0</span>
        </button>
        <div clickOutside (onClickOutside)="showFavorites = false">
          <button class="action-btn" (click)="routeToFavorites()">
            <mat-icon fontIcon="favorite"></mat-icon>

            <span class="count">0</span>
          </button>
          <div
            *ngIf="showFavorites && favoriteProducts"
            class="favorites"
           
          >
            <product-favorites
              *ngFor="let p of favoriteProducts"
              [product]="p"
              
            ></product-favorites>
          </div>
        </div>
      </div>
    `,
    styles: [`
    
  button{
    border: none;
    
  }
    .action-btn {
  position: relative;
  font-size: 26px;
  color: var(--eerie-black);
    }
   .header-user-actions{ display: none; }
   .login{
    display: flex;
    flex-direction:row-reverse;
    
  }
  .auth{
   z-index: 999;
    position: absolute;
   margin-left: -366px !important;
  }
  .open-login{
   
    background-color: white !important;
    
    z-index: 999;
  }

   .favorites{
  z-index: 12;
  width: 400px;
  position: absolute;
  padding: 0 8px 8px 8px;
  max-height: 500px;
  top: 70px;
  margin-left: -366px;

  overflow-y: scroll;
  background-color: rgb(229, 249, 255, 0.5);
}

.favorites::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(126, 124, 255, 0.3);
	background-color: #F5F5F5;
  border-radius: 5px;
}

.favorites::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

.favorites::-webkit-scrollbar-thumb
{
	background-color: #8aa9ff;
	border: 2px solid #c3ddff;
}

   @media  (min-width: 100px) {

.auth{
  left: 366px;
  right: 0;
  bottom: 50px;
  max-width: 600px !important;
 }
}
   @media (min-width: 860px) {

    .auth{
      z-index: 999;
       position: absolute;
       right: initial;
       left: initial;
       bottom: initial;
      margin-left: -366px !important;
     }

.header-user-actions {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  gap: 15px;
  margin-top: 8px;
  
}

.header-user-actions .action-btn {
  position: relative;
  /*font-size: 35px;*/
  color: var(--onyx);
  padding: 5px;
  background-color: transparent;
  color: var(--social-btn);
}

.header-user-actions .count {
  position: absolute;
  top: -2px;
  right: -3px;
  background: var(--bittersweet);
  color: var(--white);
  font-size: 12px;
  font-weight: var(--weight-500);
  line-height: 1;
  padding: 2px 4px;
  -webkit-border-radius: 20px;
          border-radius: 20px;
}

}

    `]
  })
  export class UserButtoms implements OnInit{
logOut() {
 this.auth.logout()
 this.router.navigate(['/'])
}

    productsIds: string[] = []
    favoriteProducts: TecDataResponse[] 
    showFavorites = false
    showLogin = false
    flag = true

    @Input() emailConfirm: boolean
    @Output() onClickAuth = new EventEmitter<SignInUp>()
    $user = this.auth.user
    user: Realm.User
    
routeToFavorites() {
  
  if(this.$user){
    this.$user.subscribe(u => this.user =  u) 
    if(this.user){
      if(this.auth.tokenExpired(this.user.accessToken))
        this.auth.refreshUser()

      this.userService.getUserFavorites(this.user.id, this.user.accessToken).subscribe({
          next: favorites => {
            console.log(favorites)
            this.userService.syncLocalFav(favorites)
          this.router.navigate(['/favoritos'], {
            state: {
              productIds: favorites,
            },
          });
           
          }
        })
    }
    else{
      console.log("no hay user")
      this.showLogin = true  
    }
}
}
    constructor(
        private userService: UserService, 
        private router: Router,
        public auth: AuthAltasService,
    ){}
  ngOnInit(): void {
    console.log(this.user)
    if(this.emailConfirm){
      this.showLogin = true
      
    }
  }
  onClickRegister(signInUp: SignInUp){
    this.showLogin = false
    this.onClickAuth.emit(signInUp)
  }
    // getFavorites(){
    //     this.auth.authState$.subscribe( user => {
    //       if(user){
            
    //         this.showFavorites = !this.showFavorites
    //         this.getUserFavoriteProducts()
    //       }
    
    //     })
    //   }
    
      // removeFavorites(id: number) {
      //   console.log(id)
      //   this.userSevice.removeFavorite(id).subscribe({
      //     next: () => {
      //       this.removeFavorites(id)
      //       this.userSevice.removeFavoriteIdCookie(id)
      //       this.getUserFavoriteProducts()
      //     }
      //   })
      //   }
    
      //   getUserFavoriteProducts(){
            
      //     this.auth.authState$.subscribe(user => {
      //       this.userSevice.getFavoriteProducts(user.uid).subscribe({
      //         next: products => {
      //           this.favoriteProducts = products
                
      //         }
      //       })
    
      //     })
      //   }
  }