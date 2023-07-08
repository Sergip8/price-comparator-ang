import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MenuService } from "src/app/service/menu-service";



@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
  })
  export class MenuComponent implements OnInit {
    selected = ""
    menu!: any
    @Output() categories = new EventEmitter<string>()
constructor(private service: MenuService){
    this.menu = service.getMainMenu()
}

    ngOnInit(): void {
       
    }
    showSubmenu(value: any){
        this.selected = value
        console.log(value)
    }
    getCategory(value: string){
        this.categories.emit(value)
        
    }

  }