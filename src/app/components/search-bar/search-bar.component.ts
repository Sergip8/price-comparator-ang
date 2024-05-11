import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CategoryService } from "../../service/category.service";
import { Router } from "@angular/router";
import { SearchService } from "src/app/service/search.service";
import { SuggestedProducts } from "src/app/models/tec-data-response";

@Component({
  selector: "search-bar",
  template: `
    <div class="search-container">
      <!-- <div
        class="col-2"
        (mouseover)="[(show_menu = true)]"
        (mouseleave)="[(show_menu = false)]"
      >
      <div class="cat-menu-icon">
        <img src="../../assets/icons/menu.svg" alt="" />
        <div class="cat-title">Categorias</div>

      </div>
        <div *ngIf="show_menu" class="menu" (mouseover)="[(show_menu = true)]">
          <div>
            <app-menu (categories)="getCategory($event)"></app-menu>
          </div>
          </div>
        </div> -->

      <div
       class="search-input"
       clickOutside
          (onClickOutside)="[showSuggested = false, suggestedProducts = []]"
          openModal
          [appOscurecerPagina]="showSuggested && suggestedProducts.length>0" >
        <input
          type="search"
          class="form-control"
          [formControl]="search"
          placeholder="buscar"
          (keydown.enter)="getSearchSelected(search.value)"
          (focus)="showSuggested = true"
        />
        <div
         
          class="suggested-container" *ngIf="showSuggested && suggestedProducts.length>0">
          <div *ngFor="let sp of suggestedProducts" >
            <suggested-results [suggestedList]="sp"></suggested-results> 
          
          </div>

        </div>
        <div>
          <button class="search-btn" (click)="getSearchSelected(search.value)">
              <mat-icon fontIcon="search"></mat-icon>
  
            </button>

        </div>
        <!-- <div class="search-list">
          <search-bar-result
            [query]="getCategories"
            (resultSelected)="getSearchSelected($event)"
          ></search-bar-result>
        </div> -->
      </div>
    </div>
  `,
  styles: [
    `
    .search-container{
      display:flex;
      width: 100%;
      
      justify-content: center;
    }
    .search-input{
      position:relative;
      z-index:999;
      margin-left:10px;
      width: 100%;
      max-width: 800px;
      
    }
    input{
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
      .search {
        text-align: center;
        
      }
      .suggested-container{
        position:absolute;
        margin-top:8px;
        width: 100%;
          background-color: #fff;
          border-radius: var(--border-radius-sm);
          padding: 5px
      }
     
      .search-btn {
  background: var(--white);
  border:none;
  position: absolute;
  top: 50%;
  right: 0;
  -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
          transform: translateY(-50%);
  color: var(--onyx);
  font-size: 18px;
  padding: 5px 10px 3px 10px;
  -webkit-border-radius: var(--border-radius-md);
          border-radius: var(--border-radius-md);
  -webkit-transition: color var(--transition-timing);
  -o-transition: color var(--transition-timing);
  transition: color var(--transition-timing);
 
}

.search-btn:hover { color: var(--blue-1); }
      .cat-menu{
        background: #ccc;
      }
      .cat-title{
        font-size: 20px;
        margin-left: 10px;
      }
      .cat-menu-icon{
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        padding: 10px
      }
    `,
  ],
})
export class SearchBarComponent implements OnInit {
  @Output() search_query = new EventEmitter<string>();
  @Output() category = new EventEmitter<string>();
  show_menu = false;
  searchCategory = "tec"
  search = new FormControl();
  getCategories: string[] = [];
  suggestedProducts: SuggestedProducts[] = []
  showSuggested: boolean = true

  constructor(private categories: CategoryService, private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.search.valueChanges.subscribe({
      next: (val) => {
        console.log(val)
        this.getCategories = [];
        if (val.length >= 2) {
         // this.getSuggestedProducts(val)
          this.categories.products.forEach((c) => {
            if (c.startsWith(val)) {
              if (this.getCategories.length < 6) {
                this.getCategories.push(c);
              }
            }
          });
        }
      },
    });
    //val => this.search_query.emit(val)
  }
  getCategory(value: string) {
    this.category.emit(value);
  }
  getSearchSelected(search: string) {
    this.showSuggested = false
    this.router.navigate(['/search'], {queryParams: {q: search}})
  }
  // getSuggestedProducts(search: string){
  //   this.showSuggested = true
  //   this.searchService.getSuggestedProducts(search).subscribe({
  //     next: data => {
  //       this.suggestedProducts = data}
  //   })
  // }
   
}
