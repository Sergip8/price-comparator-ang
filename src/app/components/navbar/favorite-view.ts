import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core"
import { TecDataResponse } from "src/app/models/tec-data-response"
import { UserService } from "src/app/service/user.service"

@Component({
    selector: 'product-favorites',
    template: `
  <div class="favorite-products" >
    <div>
    <img [alt]="product.name" [src]="product?.link_img" fallback="../../../assets/img/notfound.png" width="60px" height="50px" alt="...">
    </div>
    <div class="mx-2">
      <div>{{product.name}}</div>
      <div>{{product.price}}</div>

    </div>
  <div>
    <button (click)="removeProduct.emit(product.id)">Quitar</button>
  </div>
  </div>
    `,
    styles: [`
    .favorite-products{
      display: flex;
      justify-content: space-between;
      align-items: center;
        margin-top: 8px;
        padding: 0.3rem;
        background: white;
        border-radius: 0.75rem;
    }

    .product-card{
      background: white;
      display: block;
    
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
  export class ProductFavoritesComponent implements OnInit {
  
    @Input() product: TecDataResponse
    @Output() removeProduct = new EventEmitter<number>()
  
    constructor(){
  
     
    }
    ngOnInit(): void {
      //console.log(this.product.id)
    }
  
  }