import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Router } from "@angular/router"
import { SuggestedProducts } from "src/app/models/tec-data-response"


@Component({
    selector: 'suggested-results',
    template:`
    <div >
    <a (click)="routeToDetails(suggestedList)" class="suggested-item-container">
       <div>
        <img [src]="suggestedList.link_img" fallback="../../../assets/img/notfound.png" width="50px" height="50px" alt="">
       </div>
       <div>
        <div class="suggested-name">{{suggestedList.name.slice(0, 50)}}</div>
        <div class="brand-price">
            <div class="brand">{{suggestedList.brand}}</div>
            <div class="price">{{suggestedList.price | currency:'COP':'$ ' : '1.0-0'}}</div>

        </div>
       </div>
       <div class="store-img">
         <div *ngFor="let id of suggestedList.ids">
          <img src="../../../assets/img/{{getNameImage(id)}}.png"  height="30" width="30" alt="">
         </div>

       </div>

       
    </a>
    </div>
    
    `,
    styles: [`
    a{
      text-decoration:none;
      color: var(--eerie-black)
    }
        .options{
            cursor: pointer;
        }
        .suggested-item-container{
          width: 100%;
            display:grid;
            grid-template-columns: 0.08fr 0.7fr 0.2fr;
            height: 50px;
            overflow: hidden;
          
        }
        .suggested-item-container:hover{
          cursor:pointer;
          background-color: var(--blue-4)
        }
        .brand-price{
          display:grid;
          grid-template-columns: 0.7fr 1fr;
          
        }
        .price{
          font-weight: 600;
        }
        .brand{
          font-size: 12px;
        }
        .suggested-name{
          font-size: 12px;
          text-overflow: ellipsis;
    display: -webkit-box;
        }
        .store-img{
          /* position: absolute;
           left:85%;*/
          margin-top: 5px;
          display:flex;
          gap:2px;
          width: 100%;
          justify-content: end;
        }

    `]
  })

export class SuggestedResults implements OnInit{
   
    @Input() suggestedList: SuggestedProducts
    @Output() resultSelected = new EventEmitter<string>()


    constructor(private router: Router){}
    ngOnInit(): void {
        
        }

    getCategory(value: string){
       
    }
    selected(value: string){
        this.resultSelected.emit(value)
    }
    getNameImage(id: string): string{
        const id_split = id.split("-")[0]
        switch(id_split){
          case "F": return "Falabella"
          case "A": return "Alkosto"
          case "E": return "Exito"
          case "J": return "Jumbo"
          case "O": return "Olimpica"
          case "L": return "Linio"
          default: return ""
        }
        
      }
      routeToDetails(data: any){
        console.log(data)
        this.router.navigate([`/product-details/`+data.id],{
          state:{
            data: data,
          }
        })
      }
    }