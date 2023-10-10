import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'product-carousel',
  template: `
    <div>
    <owl-carousel-o [options]="customOptions">

    <ng-container *ngFor="let slide of []">
    <ng-template carouselSlide [id]="slide.id">
    <img [src]="slide.src" [alt]="slide.alt" [title]="slide.title">
    </ng-template>
    </ng-container>

</owl-carousel-o>
    </div>
  `,
  styles: [`

  `]
})
export class ProductCarouselComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private searchService: SearchService){
    this.getDiscountTecProducts()
  }

  getDiscountTecProducts(){
    this.searchService.getDiscountTecProducts().subscribe({
      next: data => console.log(data)
    })
  }
}
