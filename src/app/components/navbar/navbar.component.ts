import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/service/menu-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuCategories = {}
  categoryList = []
  menuList:any
  constructor(private menuService: MenuService, private router: Router){
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
    this.menuService.categoryLink.next(link.join("/"))
      this.router.navigateByUrl('/tecnologia/categoria/'+link.join("/"))
  }

}
