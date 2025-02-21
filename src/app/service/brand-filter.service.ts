import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TvFilters } from "../models/tv-filters";

const baseUrl = 'http://localhost:8080/api/'
@Injectable({
  providedIn: "root",
})
export class BrandFilterService{
    isBrandChecked: boolean = false

 
    
    brandState: Map<string, boolean>
    brandsSelected = new BehaviorSubject<string[]>([]) 
    brandsSelected$ = this.brandsSelected.asObservable()

    private filterBrands = new BehaviorSubject<string[]>([]) 
    filterBrands$ = this.filterBrands.asObservable()
   
    private isFilterEmpty = new BehaviorSubject<boolean>(true) 
    isFilterEmpty$ = this.isFilterEmpty.asObservable()

    categories = new BehaviorSubject<object>({}) 

    private priceRange = new BehaviorSubject<number[]>([])
    priceRange$ = this.priceRange.asObservable()

    private priceRangeState = new BehaviorSubject<number[]>([])
    priceRangeState$ = this.priceRangeState.asObservable()

    private filterState = new BehaviorSubject<object>({})
    filterState$ = this.filterState.asObservable()

    private filterList = new BehaviorSubject<object>({})
    filterList$ = this.filterList.asObservable()

    private sort = new BehaviorSubject<string>("Relevancia")
    sort$ = this.sort.asObservable()

    private filterListSelected = new BehaviorSubject<string[]>([]) 
    filterListSelected$ = this.filterListSelected.asObservable()
 
   

    constructor(private http: HttpClient){}

    updateFilterListSelected(filterNames: string[]){
      this.filterListSelected.next(filterNames)
    }
    
    updateSort(sort: string){
      this.sort.next(sort)
    }
   
    updateIsFilterEmpty(value: boolean){
      this.isFilterEmpty.next(value)
    }

    updateFilterBrands(brands: string[]){
      this.filterBrands.next(brands)
    }
    updatePriceRange(range: number[]){
      this.priceRange.next(range)
    }
    updatePriceRangeState(rangeState: number[]){
        this.priceRangeState.next(rangeState)
    }
    updateBrandsSelected(brands: string[]){
      this.brandsSelected.next(brands)
    }

    updateFilterList(filter: object){
      this.filterList.next(filter)
      sessionStorage.setItem('filters', JSON.stringify(filter))
    }
    setFilterList(){
      const filter =sessionStorage.getItem('filters')
      if(filter){
         this.filterList.next(JSON.parse(filter))
    }
    
  }
  

  getFilterList():object{
      return this.filterList.value
  }
  setFilters(filters: object){
    this.filterState.next(filters)
  }
    updateFilters(item: object){
      console.log(item)
      let filter = this.filterState.value[item["name"]] || []
      if(filter.includes(item["value"])){
        filter = filter.filter(v => v !=item["value"])  
      }
      else{
        filter.push(item["value"])      
        let filterList = this.filterList.value
        // filterList[item["name"]].filter(v => v !=item["value"])  
        // filterList[item["name"]].unshift(item["value"])
        this.updateFilterList(filterList)
      }
      let _filter = this.filterState.value
      _filter[item["name"]] = filter
      this.filterState.next(_filter)
      console.log(_filter)
    }

    updateBrands(brands: string[]){
      sessionStorage.setItem('brands', brands.toString())
    }
    getBrands(){
      let brands = []
      if(sessionStorage.getItem('brands')){
        brands = sessionStorage.getItem('brands').split(",")
        this.filterBrands.next(brands)
      }
    
    }
    // updatePriceRange(priceRange: number[]){
    //   sessionStorage.setItem('priceRange', priceRange.toString())
    // }
    getPriceRange(){
      let priceRange = []
      if(sessionStorage.getItem('priceRange')){
        priceRange = sessionStorage.getItem('priceRange').split(",").map(Number)
        console.log(priceRange)
        this.priceRange.next(priceRange)
      }
    
    }
    updateSessionPriceRangeState(priceRangeState: number[]){
      sessionStorage.setItem('priceRangeState', priceRangeState.toString())
    }
    getPriceRangeState(){
      let priceRangeState = []
      if(sessionStorage.getItem('priceRangeState')){
        priceRangeState = sessionStorage.getItem('priceRangeState').split(",").map(Number)
        this.priceRangeState.next(priceRangeState)
      }
    
    }

    getfilters(filters: string){
     return this.http.get<TvFilters>(baseUrl+`filters/${filters}`)
    }
}
