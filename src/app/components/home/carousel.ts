import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { DragScrollComponent } from "ngx-drag-scroll";
import { interval, take } from "rxjs";


export interface CarouselImg{
    id: String
    image: String
    description: String
    btnText: String
    btnCat: String
}

@Component({
    selector: 'header-carousel',
    template: `
  <div class="container">
    <drag-scroll  class="container" #nav [drag-scroll-y-disabled]="true" [snap-duration]="500" [scroll-x-wheel-enabled]="true" [scrollbar-hidden]="true" class="product-card-desktop">
       <div class="item" *ngFor="let img of carouselImg">
         
        <img drag-scroll-item  src={{img.image}} alt="">
        <div class="description">
          <div >{{img.description}}</div>
            <button class="btn-go" (click)="goTo.emit(img.btnCat)">{{img.btnText}}</button>
        </div>
       
       </div>
 
    </drag-scroll>
    

  </div>
    `,
    styles: [`

      .item {
  position: relative;
  display: inline-block;
}

.item img {
  width: 100%; /* Ajusta el tamaño de la imagen según sea necesario */
  display: block;
}

.item .description {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10px; /* Ajusta la posición vertical de la descripción */
  left: 10px; /* Ajusta la posición horizontal de la descripción */
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
  color: white;
  padding: 5px;
  border-radius: 5px;
}



.btn-go {
  background-color: #0095ff;
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: rgba(255, 255, 255, .4) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin-left: 18px;
  outline: none;
  padding: 8px .8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.btn-go:hover,
.btn-go:focus {
  background-color: #07c;
}

.btn-go:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

.btn-go:active {
  background-color: #0064bd;
  box-shadow: none;
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
      height: 20rem ;
      width: 12rem ;
      margin-right: 0.5rem;
      margin-left: 0.5rem;
      margin-top: 0.5rem;
      border-radius: 0.75rem;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  
    `]
  })
  export class Carousel{
    
    @Input() carouselImg: CarouselImg[] 
    @Output() goTo = new EventEmitter<String>()
    @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  
    ngAfterViewInit() {

      interval(8000) 
      .pipe(take(10))
      .subscribe(() => {
        if(this.ds.currIndex == 0)    
            this.ds.moveRight();
        else
            this.ds.moveTo(0);
      });
    }
 

  }