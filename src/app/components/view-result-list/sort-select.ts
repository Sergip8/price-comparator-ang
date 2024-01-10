import { Component, EventEmitter, Output } from "@angular/core";

export enum SortOptions{
    "RELEVANCIA" = "Relevancia",
    "DESCUENTO" = "Descuento", 
    "MAYOR_PRECIO" = "Mayor precio",
    "MENOR_PRECIO" = "Menor precio",
    "A_Z" = "A-Z",
    "Z_A" = "Z-A"
}

@Component({
    selector: 'sort-select',
    template: `
  <!-- <div class="sort-select">
    <select [(ngModel)]="sortSelected" (change)="sort.emit(sortSelected)">
        <option *ngFor="let s of sortOptions" [value]="s">{{s}}</option>
    </select>

  </div> -->
    `,
    styles: [`
    .google, .facebook{
        width: 100%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.3rem;
        background: white;
        border: 1px solid #eee;
        border-radius: 0.75rem;
    }
    .sort-select > select{
      padding: 8px;
      
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

  export class SortSelectOld{

    @Output() sort = new EventEmitter<string>(null)
    sortOptions: string[] = Object.values(SortOptions) 
    sortSelected = "Relevancia"

  }