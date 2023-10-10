import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BrandFilterService } from 'src/app/service/brand-filter.service';
import { MenuService } from 'src/app/service/menu-service';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.css']
})
export class MenuFilterComponent implements OnInit {

  loading = false
  
  brandsSelected = []
  brands: string[]
  categories: string[]
  @Output() priceRange = new EventEmitter<void>()

  constructor(private router: Router, 
    public brandFilter: BrandFilterService,
    private menuService: MenuService,) {
    brandFilter.brands.subscribe(b => this.brands = b)  
    brandFilter.categories.subscribe(c => this.categories = c)
   }

  ngOnInit(): void {
    
  }
  catSelected(cat:string){
    this.router.navigate(['/tecnologia'], {queryParams: {cat: cat}, queryParamsHandling: 'merge'})
  }
  brandList(brand:any){
    console.log(brand)
    this.loading = true
    if (brand?.selected){
      this.brandsSelected.push(brand.value)
      this.brands = this.brands.filter(v => v !=brand.value)
     
      this.brands.unshift(brand.value)
    }
    if (!brand?.selected)
    this.brandsSelected =  this.brandsSelected.filter(v => v !=brand.value)
    console.log(this.brandsSelected)
    
    
    
    this.router.navigate(['/tecnologia'], {queryParams: {brands: this.brandsSelected}, queryParamsHandling: 'merge'})

  }
  brandSelected(brand: string, index: number){
    let _brands = this.brandFilter.brands.value
    let brands = []
    brands = this.brandFilter.brandsSelected.value
    if(this.brandFilter.brandsSelected.value.includes(brand)){
      brands =  this.brandFilter.brandsSelected.value.filter(v => v !=brand)
    }else{
      brands.push(brand)
      _brands.splice(index, 1)
      _brands.unshift(brand)
      this.brandFilter.brands.next(_brands)
    }
    this.brandFilter.brandsSelected.next(brands)
    //  let brands = this.brandFilter.brandsState$.value
  //   let brandsList = []
  // brands[brand] = !brands[brand]
  // this.brandFilter.brandsState$.next(brands)
  // console.log(this.brandFilter.brandsState$)
  // Object.keys(this.brandFilter.brandsState$.value).forEach((key)=>{ if(this.brandFilter.brandsState$.value[key]) brandsList.push(key) }) 
  let catLink = this.menuService.categoryLink.value
  if(catLink == "")
  this.router.navigate(['/tecnologia'], {queryParams: {brands: this.brandFilter.brandsSelected.value.toString()}, queryParamsHandling: 'merge'})
    else
    this.router.navigate(['/tecnologia/categoria/'+catLink], {queryParams: {brands: this.brandFilter.brandsSelected.value.toString()}, queryParamsHandling: 'merge'} )
  }

}
