import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TecDataResponse } from 'src/app/models/tec-data-response';
import { AuthService } from 'src/app/service/auth.service';
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

  menuCategories = {}
  categoryList = []
 
  menuList:any

  flag = true
  showCategories = false
showDesktopMenu: boolean = false;
showFilters: boolean = false;
showLoginMobile: boolean = false;

  constructor(public menuService: MenuService, 
    private userSevice: UserService, 
    private router: Router, 
    public auth: AuthService,
    public uiService: UIService){
   
    
    
    //menuService.getPartesPcCategories()
  }
  ngOnInit(): void {
    this.menuService.categories.subscribe(c => this.menuCategories = c)
  }
 

  catSelected(cat: string){
 
  }
  navigateTo(...link: string[]){
    //this.menuService.categoryLink.next(link.join("/"))
    
      this.router.navigateByUrl('/categoria/'+(link.join("/").toLowerCase()))
  }
  getMenuCategories(){
    this.showCategories = !this.showCategories
    let menu = this.menuService.getLocalMenuCategories()
    if (menu){
        this.menuCategories = menu
    }
    else{
        this.menuService.categories.subscribe(c => this.menuCategories = c)

    }
}

 
  

}
