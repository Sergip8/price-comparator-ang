import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { BrandFilterService } from "src/app/service/brand-filter.service";

export enum SortOptions{
  "DESCUENTO" = "Descuento", 
    "RELEVANCIA" = "Relevancia",
    "MAYOR_PRECIO" = "Mayor precio",
    "MENOR_PRECIO" = "Menor precio",
    "A_Z" = "A-Z",
    "Z_A" = "Z-A"
}

@Component({
    selector: 'sort-select',
    template: `
  <div class="sort-select">
    <select [(ngModel)]="sortSelected" (change)="setUrlSort(sortSelected)">
        <option *ngFor="let s of sortOptions " [value]="s">{{s}}</option>
    </select>

  </div>
    `,
    styles: [`
 
    .sort-select > select{
      padding: 8px;
   
      
    }
    select{
      border:none;
      background-color: transparent;
    }
    option{
      gap: 8px;
      padding-top:5px;
    }
    select:active{
      border:none;
    }
    select::selection{
      padding:8px;
    }
    svg{
        width: 2rem ;
        height: auto ;
    }
    .social-buttons{
        width: 100%;
}
    `]
  })

  export class SortSelect implements OnInit{

    
    sortOptions: string[] = Object.values(SortOptions) 
    sortSelected: string = "Relevancia"

    
    path = new URL(window.location.href).pathname
    constructor(private router: Router, private filtersService: BrandFilterService){
      this.filtersService.sort$.subscribe(s => this.sortSelected = s)

    }
  ngOnInit(): void {
    
    console.log("######sort$$###### " + this.sortSelected)
  }

    setUrlSort(sort: string){
      console.log("######sort###### " + sort)
      
      
        this.router.navigate([this.path], {queryParams: {sort: sort}, queryParamsHandling: 'merge'})
    }

  }