import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuService } from 'src/app/service/menu-service';

@Component({
  selector: 'app-categories-menu-list',
  templateUrl: './categories-menu-list.component.html',
  styleUrls: ['./categories-menu-list.component.css']
})
export class CategoriesMenuListComponent {
  @Input() category: string
  @Output() cat = new EventEmitter<string>()

  constructor(public menuService: MenuService){
    
  }
}
