import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CategoryService } from "../../service/category.service";

@Component({
  selector: "search-bar",
  template: `
    <div class="row mt-4 justify-content-center align-items-center">
      <div
        class="col-1"
        (mouseover)="[(show_menu = true)]"
        (mouseleave)="[(show_menu = false)]"
      >
        <img src="../../assets/icons/menu.svg" alt="" />
        <div *ngIf="show_menu" class="menu" (mouseover)="[(show_menu = true)]">
          <div>
            <app-menu (categories)="getCategory($event)"></app-menu>
          </div>
        </div>
      </div>
      <div class="col-2">
        <select
          #type
          class="form-select "
          aria-label="Default select example"
          (select)="searchType(type.value)"
        >
          <option value="mer" selected>Mercado</option>
          <option value="tec">Tecnologia</option>
        </select>
      </div>

      <div class="col-5">
        <input
          type="search"
          class="form-control"
          [formControl]="search"
          placeholder="buscar"
          (keydown.enter)="getSearchSelected(search.value)"
        />
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
      .search {
        text-align: center;
      }
      .menu, .search-list {
        position: absolute;
      }
    `,
  ],
})
export class SearchBarComponent implements OnInit {
  @Output() search_query = new EventEmitter<string>();
  @Output() category = new EventEmitter<string>();
  show_menu = false;
  search = new FormControl();
  getCategories: string[] = [];
  constructor(private categories: CategoryService) {}

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
    this.search_query.emit(search);
  }

  searchType(value: string) {}
}
