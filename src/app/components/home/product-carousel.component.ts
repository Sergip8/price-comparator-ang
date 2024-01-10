import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PartesPcData } from 'src/app/models/partes-pc-data';
import { TecDataResponse } from 'src/app/models/tec-data-response';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'product-carousel',
  template: `
<div class="container px-0" >
  <h3></h3>
  <h4>{{title}}</h4>
  <drag-scroll [scroll-x-wheel-enabled]="true" [scrollbar-hidden]="true">
    <div *ngIf="partesPcHome" class="d-flex">
      <app-partes-pc-list class="partes-pc-card mb-1" *ngFor="let partes of partesPcHome" [partesPc]="partes" drag-scroll-item></app-partes-pc-list>
    </div>
    <div *ngIf="products" >
      <view-result-card [isPartesPc]="isPartesPc"  class="product-card mb-1" *ngFor="let p of products; let i = index" drag-scroll-item [data]="p" ></view-result-card>
    </div>
  </drag-scroll>
</div>
  `,
  styles: [`
  
  drag-scroll {
    height: fit-content;
  width: 100%;
  padding-right: 0.5rem; 
}
  .product-card{
    background: white;
    display: block;
  height: 20rem ;
  width: 12rem ;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  .partes-pc-card{
    background: white;
    overflow: hidden;
  height: 10rem ;
  min-width: 12rem ;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.75rem !important;
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
