import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PartesPcData } from 'src/app/models/partes-pc-data';
import { TecDataResponse } from 'src/app/models/tec-data-response';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'product-carousel',
  template: `
<div class="container" >
  <h3></h3>
  <h4>{{title}}</h4>
  <drag-scroll [drag-scroll-y-disabled]="true"  [scroll-x-wheel-enabled]="true" [scrollbar-hidden]="true" class="product-card-desktop">
    <div *ngIf="products" class="product-card-container">
      <view-result-card [isPartesPc]="isPartesPc"  class="product-card" *ngFor="let p of products; let i = index" drag-scroll-item [data]="p" ></view-result-card>
    </div>
  </drag-scroll>
</div>
<div class="product-card-mobile">
<view-result-card [isPartesPc]="isPartesPc"  class="product-card " *ngFor="let p of products; let i = index" drag-scroll-item [data]="p" ></view-result-card>
</div>
  `,
  styles: [`
  .product-card-container{
    
  }
  .product-card-mobile{
  
     display: none; 
    }
    .product-card-desktop{
      display: block; 
    }
  @media (max-width: 860px) {
    .product-card-mobile{
      display: flex;
    overflow-x: scroll;
   
    }
    .product-card-desktop{
      display: none; 
    }
  }

  .product-card{
    background: white;
   
    width: 12rem ;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  `]
})
export class ProductCarouselComponent implements OnInit {

  @Input() products: TecDataResponse[]
  @Input() category: string
  @Input() partesPcHome: PartesPcData[]
  @Input() title: string
  @Input() isPartesPc: boolean

  constructor(private searchService: SearchService, private scroll: ViewportScroller){

   
  }
  ngOnInit(): void {
    
  }

}
