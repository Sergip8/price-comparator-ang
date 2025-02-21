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
    <div class="favorite-desc">
      <div class="favorite-name">{{product.name}}</div>
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
    .favorite-desc{
      padding: 0 8px 0 8px
    }
    .favorite-name{
      display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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