import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { MenuService, StoreType } from "src/app/service/menu-service";



@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
  })
  export class MenuComponent implements OnInit {
showDesktopMenu: boolean;
mainCategorySelected: string
@Output() closeMenu = new EventEmitter<boolean>()
selected = ""
menu!: any
menuCategories: object
subMenu: object
mainCategories: string[]
@Output() categories = new EventEmitter<string>()
constructor(public menuService: MenuService, private router: Router){
    this.mainCategories = menuService.mainCat
}
navigateTo(...cat: string[]) {
    if(this.mainCategorySelected == "partes-pc"){
        this.menuService.updateStoreTypeState(StoreType.PARTES_PC)
    }else
        this.menuService.updateStoreTypeState(StoreType.GRANDES_SUPERFICIES)
    this.closeMenu.emit(false)
    this.router.navigateByUrl('/categoria/'+(cat.join("/").toLowerCase()))
}

    ngOnInit(): void {
       this.getMenuCategories()
    }
    showSubmenu(value: string){
        this.mainCategorySelected = value
        this.subMenu = this.menuCategories[value]

    }
    getCategory(value: string){
       
        
    }
   getMenuCategories(){
        let menu = this.menuService.getLocalMenuCategories()
        if (menu){
            this.menuCategories = menu
        }
        else{
            this.menuService.getMenuCategories().subscribe({
                next: cat => {     
                           
                const menuCategory = this.menuService.listaAObjeto(cat[0].categories)
                this.menuService.setMenuCategories(menuCategory)
                this.menuCategories = menuCategory
        
                },
                error: e => console.log(e)
            })
            

        }
    }

  }