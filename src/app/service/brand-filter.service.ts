import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BrandFilterService{
    isBrandChecked: boolean = false

 
    
    brandState: Map<string, boolean>
    brandsSelected = new BehaviorSubject<string[]>([]) 
    brands = new BehaviorSubject<string[]>([]) 
    categories = new BehaviorSubject<string[]>([]) 
    priceRange = new BehaviorSubject<number[]>([1, 20000000])
    priceRangeState = new BehaviorSubject<number[]>([1, 20000000])


    updateBrands(brands: string[]){
      sessionStorage.setItem('brands', brands.toString())
    }
    getBrands(){
      let brands = []
      if(sessionStorage.getItem('brands')){
        brands = sessionStorage.getItem('brands').split(",")
        this.brands.next(brands)
      }
    
    }
    updatePriceRange(priceRange: number[]){
      sessionStorage.setItem('priceRange', priceRange.toString())
    }
    getPriceRange(){
      let priceRange = []
      if(sessionStorage.getItem('priceRange')){
        priceRange = sessionStorage.getItem('priceRange').split(",").map(Number)
        console.log(priceRange)
        this.priceRange.next(priceRange)
      }
    
    }
    updatePriceRangeState(priceRangeState: number[]){
      sessionStorage.setItem('priceRangeState', priceRangeState.toString())
    }
    getPriceRangeState(){
      let priceRangeState = []
      if(sessionStorage.getItem('priceRangeState')){
        priceRangeState = sessionStorage.getItem('priceRangeState').split(",").map(Number)
        this.priceRangeState.next(priceRangeState)
      }
    
    }
}
