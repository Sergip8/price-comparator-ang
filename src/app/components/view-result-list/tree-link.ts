import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { BrandFilterService } from "src/app/service/brand-filter.service";
import { LinkTree, MenuService } from "src/app/service/menu-service";

export enum SortOptions{
    "RELEVANCIA" = "Relevancia",
    "DESCUENTO" = "Descuento", 
    "MAYOR_PRECIO" = "Mayor precio",
    "MENOR_PRECIO" = "Menor precio",
    "A_Z" = "A-Z",
    "Z_A" = "Z-A"
}

@Component({
    selector: 'tree-link',
    template: `
  <div class="tree">
    <span class="link" routerLink="/">inicio</span>
    <span>/</span>
    <div *ngFor="let link of treeLinks let i = index" >
      <span class="link" (click)="linkTreeSelected(i)">{{normaliceText(link)}}</span>
      <span *ngIf="i<=treeLinks.length-2">/</span>
    </div>
  
  </div>
    `,
    styles: [`
    .tree{
    
        display: flex;
        padding: 16px 5px 16px 5px;
        border-radius: 0.75rem;

    }
    .link{
      cursor: pointer;
          
      margin-left: 8px;
      margin-right: 8px;
    }
    .link:hover{
      text-decoration: underline;
    }
    

    `]
  })

  export class TreeLinks implements OnInit{
normaliceText(item: LinkTree):string {
  if(item.type === "category")
  return this.menuService.convertAccentString(item.value)
  else if(item.type === "filter")
   return item.value.split("_")[1]
  else
    return item.value
}
    
    path = new URL(window.location.href).pathname
    treeLinks: LinkTree[]
    constructor(private menuService: MenuService,
      private filterService: BrandFilterService,
      private router: Router, ){
      menuService.linkTreeState$.subscribe(lts => this.treeLinks = lts)
      
    }
    ngOnInit(): void {
      console.log(this.treeLinks)
    }
    linkTreeSelected(index: number) {
      let category = []
      let brand = []
      let filters = {}
      let search = ""

      this.menuService.removeLinkTree(index)
      this.menuService.linkTreeState$.subscribe(lts => this.treeLinks = lts)
    

      this.treeLinks.forEach(tl =>{
        if(tl.type == 'category'){
          category.push(tl.value)
        }
        if(tl.type == "search"){
          search = tl.value
        }
        if(tl.type == 'brand'){
          brand.push(tl.value)
        }
        if(tl.type == 'filter'){
          const splitFilter = tl.value.split("_")
          if(filters.hasOwnProperty(splitFilter[0])){
            filters[splitFilter[0]].push(splitFilter[1])
          }
          else
          filters[splitFilter[0]] = [splitFilter[1]]
          //filter.push({[splitFilter[0]]: [splitFilter[1]]})

        }
        
      })
      
      if(Object.keys(filters).length === 0){
        this.filterService.updateIsFilterEmpty(true)

      }
      if(this.path.includes("categoria")){
      this.router.navigate([`/categoria/${category.join("/")}`], {queryParams: {brands: brand.toString(), filters: JSON.stringify(filters)}, queryParamsHandling: 'merge'})
    }
    else{
      this.router.navigate([`/search/`], {queryParams: {q: search, cat: category.toString(), brands: brand.toString(), filters: JSON.stringify(filters)}, queryParamsHandling: 'merge'})

    }

    }


  }