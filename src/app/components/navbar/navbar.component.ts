import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TecDataResponse } from 'src/app/models/tec-data-response';
import { SignInUp } from 'src/app/service/auth-atlas.service';

import { MenuService } from 'src/app/service/menu-service';
import { UIService } from 'src/app/service/ui.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('sidebarTrigger', [
      // To add a cool "enter" animation for the sidebar
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),

      // To define animations based on trigger actions
      state('open', style({ transform: 'translateX(0%)' })),
      state('close', style({ transform: 'translateX(-100%)' })),
      transition('open => close', [
        animate('300ms ease-in')
      ]),
      transition('close => open', [
        animate('300ms ease-out')
      ])
    ])
  ]

})
export class NavbarComponent implements OnInit {
onRegister(signInUp: SignInUp) {
  if(SignInUp.SIGNUP)
  this._snackBar.open("Registro Ok", "Verifica el correo", {
    duration: 2000,
  });
  if(SignInUp.SIGNUP)
  this._snackBar.open("Login Ok", "", {
    duration: 2000,
  });
}

  menuCategories = {}
  categoryList = []
 
  menuList:any
  windowHeight: number = window.innerHeight;
  flag = true
  showCategories = false
  showDesktopMenu: boolean = false;
  showFilters: boolean = false;
  showLoginMobile: boolean = false;
  showLogin: boolean = false;

  constructor(public menuService: MenuService, 
    private router: Router, 
    public uiService: UIService,
    private _snackBar: MatSnackBar){
   
    
    
    //menuService.getPartesPcCategories()
  }
  ngOnInit(): void {
    console.log(this.windowHeight)
    //this.menuService.categories.subscribe(c => this.menuCategories = c)
    this.getMenuCategories()
    const emailConfirm = sessionStorage.getItem("emailConfirm")
    console.log(emailConfirm)
    if(emailConfirm){
      this.showLoginMobile = true
      this.showLogin = true
      sessionStorage.removeItem("emailConfirm")
    }
  }
 

  catSelected(cat: string){
 
  }
  navigateTo(...link: string[]){
    //this.menuService.categoryLink.next(link.join("/"))
    
      this.router.navigateByUrl('/categoria/'+(link.join("/").toLowerCase()))
  }
//   getMenuCategories(){
//     this.showCategories = !this.showCategories
//     let menu = this.menuService.getLocalMenuCategories()
//     if (menu){
//         this.menuCategories = menu
//     }
//     else{
//         this.menuService.categories.subscribe(c => this.menuCategories = c)

//     }
// }
getMenuCategories(){
 
  let menu = this.menuService.getLocalMenuCategories()
  if (menu){
      this.menuCategories = menu
  }
  else{
        
          this.menuService.getMenuCategories().subscribe({
              next: data => {

                        
                  const menuCategory =  this.menuService.listaAObjeto(data)
                  this.menuService.setMenuCategories(menuCategory)
                  this.menuCategories = menuCategory
          
              }
          })
          
          
    
      

  }
}

 
  

}
