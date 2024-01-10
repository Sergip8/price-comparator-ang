import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TvFilters } from 'src/app/models/tv-filters';
import { BrandFilterService } from 'src/app/service/brand-filter.service';
import { MenuService } from 'src/app/service/menu-service';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.css']
})



export class MenuFilterComponent implements OnInit {
removeFiltersUpdate() {
 this.removeFilters()
 this.queryParams["filters"] = ""
  this.router.navigate([], {queryParams: this.queryParams, relativeTo:this.route, queryParamsHandling: 'merge'})
}
removeFilters() {
  const filterNames = Object.getOwnPropertyNames(this.filtersSelected)
  filterNames.forEach(fn =>{
    this.filtersSelected[fn] = []
  })
  this.brandFilter.updateIsFilterEmpty(true)
}

  loading = false
  brandsSelected = []
  brands: string[]
  categories: object
  filters: object
  filterNameList: string[]

  filtersSelected:object
  filterIsEmpty: boolean
  @Input() filterMobile: string
  @Input() isMobile: boolean
  mobileAction: string
  @Output() mobileFilter = new EventEmitter<boolean>(false)
  queryParams: any
  


  //@Output() priceRange = new EventEmitter<void>()

  constructor(private router: Router, 
    public brandFilter: BrandFilterService,
    private route: ActivatedRoute,
    private menuService: MenuService,) {
    this.queryParams = { ...this.route.snapshot.queryParams };
    brandFilter.filterBrands$.subscribe(b => this.brands = b)  
    brandFilter.filterList$.subscribe(fl => this.filters = fl)
    brandFilter.categories.subscribe(c => this.categories = c)
    brandFilter.isFilterEmpty$.subscribe(fe => this.filterIsEmpty = fe)
    brandFilter.filterListSelected$.subscribe(fls => this.filterNameList = fls)
    
    
   
   
   }

  ngOnInit(): void {
   
    this.brandFilter.filterState$.subscribe(tf => this.filtersSelected = tf)
    this.isFiltersEmpty()
   console.log(this.filters)

    
  }
  catSelected(cat:string[]){
   
    this.mobileFilter.emit()
    const url = this.route.snapshot.url.map(segment => segment.path)[0];
 

    if(url === "categoria"){
      const joinCategory = cat.join("/")
      this.router.navigate([url+"/"+ joinCategory], {queryParams: this.queryParams, queryParamsHandling: 'merge'} )

    }
    else{
      this.queryParams["cat"] = cat.toString()
      this.router.navigate([], {queryParams: this.queryParams, relativeTo:this.route, queryParamsHandling: 'merge'})

    }
    //console.log("path category"+ this.path)
  }

  // brandList(brand:any){
  //   console.log(brand)
  //   this.loading = true
  //   if (brand?.selected){
  //     this.brandsSelected.push(brand.value)
  //     this.brands = this.brands.filter(v => v !=brand.value)
     
  //     this.brands.unshift(brand.value)
  //   }
  //   if (!brand?.selected)
  //   this.brandsSelected =  this.brandsSelected.filter(v => v !=brand.value)
  //   console.log(this.brandsSelected)
    
    
    
  //   this.router.navigate([this.path], {queryParams: {brands: this.brandsSelected}, queryParamsHandling: 'merge'})

  // }
  brandSelected(brand: string, index: number){
    let _brands = []
    let brands = []
    this.brandFilter.filterBrands$.subscribe(b => _brands = b)
    brands = this.brandFilter.brandsSelected.value
    if(this.brandFilter.brandsSelected.value.includes(brand)){
      brands = this.brandFilter.brandsSelected.value.filter(v => v !=brand)
    }else{
      brands.push(brand)
      _brands.splice(index, 1)
      _brands.unshift(brand)
      this.brandFilter.updateBrands(_brands)
      
    }
    this.brandFilter.filterBrands$.subscribe(b => this.brands = b)
    this.brandFilter.updateBrandsSelected(brands)
    //  let brands = this.brandFilter.brandsState$.value
  //   let brandsList = []
  // brands[brand] = !brands[brand]
  // this.brandFilter.brandsState$.next(brands)
  // console.log(this.brandFilter.brandsState$)
  // Object.keys(this.brandFilter.brandsState$.value).forEach((key)=>{ if(this.brandFilter.brandsState$.value[key]) brandsList.push(key) }) 
  if (!this.isMobile){
    this.queryParams["brands"] = this.brandFilter.brandsSelected.value.toString()
    this.router.navigate([], {queryParams: this.queryParams, relativeTo:this.route, queryParamsHandling: 'merge'})

  }
  
  
  }

  getPriceRange(priceRange: number[]){
    this.queryParams["priceRange"] = priceRange.toString()
    this.router.navigate([], {queryParams: this.queryParams, relativeTo:this.route, queryParamsHandling: 'merge'})
  
    }

    
    itemFilterSelected(item: object){
     
      this.brandFilter.updateFilters(item)
      this.brandFilter.filterState$.subscribe(tf => this.filtersSelected = tf)
      this.isFiltersEmpty()

      if (!this.isMobile){
     
        if(this.filterIsEmpty){
          this.queryParams["filters"] = ""
          this.router.navigate([], {queryParams: this.queryParams, relativeTo:this.route, queryParamsHandling: 'merge'})
        }else
        this.queryParams["filters"] = JSON.stringify(this.filtersSelected)
        this.router.navigate([], {queryParams: this.queryParams, relativeTo:this.route, queryParamsHandling: 'merge'})
        //console.log(item)

      }
    }
    isFiltersEmpty(){
      this.filterIsEmpty = true
      const filterNames = Object.getOwnPropertyNames(this.filtersSelected)
      filterNames.forEach(fn =>{
        if(this.filtersSelected[fn].length > 0){
          this.brandFilter.updateIsFilterEmpty(false)
          return  
        }
        this.brandFilter.updateIsFilterEmpty(true)
        
      
      })
    }

    ngOnChanges(changes: SimpleChanges) {
    
      this.mobileAction = changes["filterMobile"].currentValue

      if(this.mobileAction === 'reset'){
        this.removeFilters()
        this.brandFilter.updateBrandsSelected([])
  
        
      }
      if(this.mobileAction === 'apply'){
       
        this.router.navigate([], {queryParams: {operator: "or", filters: JSON.stringify(this.filtersSelected), relativeTo:this.route, brands: this.brandFilter.brandsSelected.value.toString()}, queryParamsHandling: 'merge'})
        //console.log(item)
      
      
      }
    }
  
}
