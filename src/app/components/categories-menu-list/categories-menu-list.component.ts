import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuService } from 'src/app/service/menu-service';

@Component({
  selector: 'app-categories-menu-list',
  templateUrl: './categories-menu-list.component.html',
  styleUrls: ['./categories-menu-list.component.css']
})
export class CategoriesMenuListComponent implements OnInit {
getCategory(...cat: string[]) {
throw new Error('Method not implemented.');
}
  @Input() category: object
  @Output() cat = new EventEmitter<string[]>()

  constructor(public menuService: MenuService){
    console.log(this.category)
  }
  ngOnInit(): void {
    console.log(this.category)
  }
}
