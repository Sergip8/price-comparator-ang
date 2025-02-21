import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TvFilters } from "src/app/models/tv-filters";

@Component({
  selector: "product-filter",
  template: `
    <div class="filter-container">
      <h3 (click)="showFilter = !showFilter" class="filter-name">
        {{ filterName }}
      </h3>
      <div
      
        [@expandCollapse]="showFilter || filterNameSelected.includes(filterName) ? 'expanded' : 'collapsed'"
        [class]="filterItems.length<9 ? 'filter-item-show-scroll': 'filter-item-show'"
        >
        <div
          class="product-filter"
          *ngFor="let fi of filterItems; index as i"
          (click)="
            filterSelected.emit({ name: filterName, value: fi[0], index: i })
          "
          
        >
          <div>
            <input
              class="filter-checkbox"
              [checked]="filterList ? filterList.includes(fi[0]) : false"
              type="checkbox"
            />
          </div>
          <div class="filter-item">
            <div class="filter" type="button">&nbsp;{{ fi[0] }}</div>
            <div>({{fi[1]}})</div>

          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .filter-container {
        display: flex;
        flex-direction: column;
        margin-top: 8px;
      }
      .product-filter {
        display: flex;
        align-items: center;
        padding: 1px;
        cursor: pointer;
        padding-left: 16px;
        padding-right: 16px;
      }
      .product-filter:hover {
        background-color: var(--filter-hover);
      }
      .filter-item{
        width: 100%;
        display:flex;
        justify-content: space-between;
      }

      .filter-item-show {
        pointer-events: auto;
        transition: max-height 0.5s ease-out;
        max-height: 200px;
        overflow-y: scroll;
      }
      .filter-item-show-scroll {
        pointer-events: auto;
        transition: max-height 0.5s ease-out;
        max-height: 200px;
        overflow: hidden;
      }
      
   

      .filter {
        display: flex;
        align-items: center;
        padding-left: 6px;
        font-size: 12px;
      }
      .filter-name {
       border-bottom: 1px solid #ccc;
       padding-left: 8px;
        cursor: pointer;
        z-index: 60;
      }
      input[type="checkbox"] {
        /* Add if not using autoprefixer */
        -webkit-appearance: none;
        /* Remove most all native input styles */
        appearance: none;
        /* For iOS < 15 */
        background-color: var(--form-background);
        /* Not removed via appearance */
        margin: 0;

        font: inherit;
        color: var(--eerie-black);
        width: 1.15em;
        height: 1.15em;
        border: 0.15em solid var(--eerie-black);
        border-radius: 0.15em;
        transform: translateY(-0.075em);

        display: grid;
        place-content: center;
      }

      input[type="checkbox"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        transform: scale(0);
        transform-origin: bottom left;
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em #007bff;
        /* Windows High Contrast Mode */
        background-color: CanvasText;
      }

      input[type="checkbox"]:checked::before {
        transform: scale(1);
      }

      input[type="checkbox"]:focus {
        outline: max(2px, 0.15em) solid currentColor;
        outline-offset: max(2px, 0.15em);
      }

      input[type="checkbox"]:disabled {
        --form-control-color: var(--form-control-disabled);

        color: var(--form-control-disabled);
        cursor: not-allowed;
      }

      .filter-item-show::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(95, 93, 214, 0.3);
	background-color: var(--filter-track-scroll-background);
  border-radius: var(--border-radius-sm);
}

.filter-item-show::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

.filter-item-show::-webkit-scrollbar-thumb
{
	background-color: var(--filter-thumb-scroll--background);
	border: 2px solid #c3ddff;
  border-radius: var(--border-radius-sm);
}

    `,
  ],
  animations: [
    trigger("expandCollapse", [
      state("collapsed", style({ height: "0", display: "none" })),
      state("expanded", style({ height: "*" })),
      transition("collapsed => expanded", animate("300ms ease-out")),
      transition("expanded => collapsed", animate("250ms ease-in")),
    ]),
  ],
})
export class FilterView implements OnInit {
  showFilter: Boolean = false;
  @Input() filterList: string[] = [];
  @Input() filterItems: string[];
  @Input() filterName: string;
  @Input() filterNameSelected: string[]
  @Output() filterSelected = new EventEmitter<object>();
  constructor() {}
  ngOnInit(): void {


    //console.log(this.product.id)
  
  }
}
