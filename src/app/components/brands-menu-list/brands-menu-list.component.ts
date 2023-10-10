import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BrandFilterService } from 'src/app/service/brand-filter.service';

@Component({
  selector: 'app-brands-menu-list',
  templateUrl: './brands-menu-list.component.html',
  styleUrls: ['./brands-menu-list.component.css']
})
export class BrandsMenuListComponent {

  isBrandChecked = false
  @Input() brand: string
  @Output() brandRes = new EventEmitter<any>()
  @Input() isBrandSelected: string
  
  constructor(public brandFilter: BrandFilterService, private router: Router){
    
    brandFilter.isBrandChecked
  }
  brand1(){


    
  //   if(this.brandFilter.brandsSelected.includes(this.brand)){
  //     this.brandFilter.brandsSelected =  this.brandFilter.brandsSelected.filter(v => v !=this.brand);
  //     this.brandFilter.isBrandChecked = false

  //   } else{
  //     this.brandFilter.brandsSelected.push(this.brand)
  //     this.brandFilter.isBrandChecked = true

  //   }
  //   if(this.brandFilter.brandsSelected.length>0)
  //   this.router.navigate(['/tecnologia'], {queryParams: {brands: this.brandFilter.brandsSelected.toString()}, queryParamsHandling: 'merge'})
  //   console.log(this.brandFilter.brandsSelected)
   }

}
