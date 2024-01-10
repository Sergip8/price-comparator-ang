import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/service/menu-service';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.css'],
  animations: [
    trigger('subcat', [
      // To add a cool "enter" animation for the sidebar
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),

      // To define animations based on trigger actions
     
    ])
  ]
})
export class MenuMobileComponent {
  
  @Input() menuCategories: {}
  @Output() closeMenu = new EventEmitter<boolean>(false)
  subcategory_1:string
  subcategory_2:string
  
  constructor(public menuService: MenuService, private router: Router){}
  
  navigateSubcategory(index: string) {
    this.subcategory_1 = index
    console.log(this.subcategory_1)
    console.log(this.menuCategories)
  }
  catSelected(cat:string){
    
  }
  navigateTo(...link: string[]){
    //this.menuService.categoryLink.next(link.join("/"))
      this.closeMenu.emit()
    
      this.router.navigateByUrl('/categoria/'+(link.join("/").toLowerCase()))
  }

}
