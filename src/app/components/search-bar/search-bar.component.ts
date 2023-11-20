import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CategoryService } from "../../service/category.service";
import { Router } from "@angular/router";

@Component({
  selector: "search-bar",
  template: `
    <div class="d-flex">
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
      <div class="">
        <select
          #type
          class="form-control"
          aria-label="Default select example"
          (select)="searchCategory = type.value"
          (change)="searchCategory = type.value"
        >
          <option value="tec" selected>Tecnologia</option>
          <option value="ppc" >PartesPc</option>
          <option value="mer">Mercado</option>

        </select>
      </div>

      <div class="search-input">
        <input
          type="search"
          class="form-control"
          [formControl]="search"
          placeholder="buscar"
          (keydown.enter)="getSearchSelected(search.value)"
        />
        
        <button class="search-btn " (click)="getSearchSelected(search.value)">
            <mat-icon fontIcon="search"></mat-icon>

          </button>
        <div class="search-list">
          <search-bar-result
            [query]="getCategories"
            (resultSelected)="getSearchSelected($event)"
          ></search-bar-result>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .search-input{
      margin-left:10px;
      width: 80%
    }
      .search {
        text-align: center;
      }
      .menu, .search-list {
        position: absolute;
        z-index: 10;
        background: #fff;
        
        width: 40%;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); 
      }
      .search-btn {
  background: var(--white);
  border:none;
  position: absolute;
  top: 50%;
  right: 2px;
  -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
          transform: translateY(-50%);
  color: var(--onyx);
  font-size: 18px;
  padding: 6px 10px 3px 10px;
  -webkit-border-radius: var(--border-radius-md);
          border-radius: var(--border-radius-md);
  -webkit-transition: color var(--transition-timing);
  -o-transition: color var(--transition-timing);
  transition: color var(--transition-timing);
  margin-right: 15px;
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
  constructor(private categories: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.search.valueChanges.subscribe({
      next: (val) => {
        this.getCategories = [];
        if (val.length >= 2) {
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
    console.log(this.show_menu);
  }

  getCategory(value: string) {
    this.category.emit(value);
  }

  getSearchSelected(search: string) {
    if(this.searchCategory == "ppc")
      this.router.navigateByUrl(`/partes_pc/${search}`)
    //this.search_query.emit(search);
    if(this.searchCategory == "tec")
    this.router.navigate(['/tecnologia'], {queryParams: {search: search}})
    if(this.searchCategory == "mer")
    this.router.navigate(['/mercado'], {queryParams: {search: search}})

  }

  searchType(value: string) {}
}
