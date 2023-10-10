import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
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
constructor(private service: MenuService, private router: Router){
    this.menu = service.getMainMenu()
}

    ngOnInit(): void {
       
    }
    showSubmenu(value: any){
        this.selected = value
        console.log(value)
    }
    getCategory(value: string){
        if (this.selected === 'Mercado')
        this.router.navigate(['/mercado/categoria', value])
        if (this.selected === 'Tecnologia')
        this.router.navigate(['/tecnologia/categoria', value])
        this.categories.emit(value)
        
    }

  }