import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { BrandFilterService } from "src/app/service/brand-filter.service";
import { MenuService, StoreType } from "src/app/service/menu-service";
import { SortService } from "src/app/service/sort-products.service";
import { TvFilters } from "src/app/models/tv-filters";
import { ProductPayload } from "src/app/models/product-payload";
import { SortOptions } from "./sort-select";
import { UIService } from "src/app/service/ui.service";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { AuthAltasService } from "src/app/service/auth-atlas.service";
import { ProductAtlasService } from "src/app/service/product-atlas.service";
import { Filters, Product, ProductResponse } from "src/app/models/product-atlas";
import { UserService } from "src/app/service/user.service";


export enum FilterSelectedState{
  CATEGORY,
  BRAND,
  FILTERS,

}
@Component({
  selector: "products-view",
  templateUrl: "./view-result-listU.component.html",
  styleUrls: ["./view-result-listU.component.css"],
  animations: [
    trigger('sidebarTrigger', [
      // To add a cool "enter" animation for the sidebar
    

      // To define animations based on trigger actions
      state('open', style({ transform: 'translateX(0%)' })),
      state('close', style({ transform: 'translateX(100%)'})),
      transition('open => close', [
        animate('300ms ease-in')
      ]),
      transition('close => open', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class ViewResultListUComponent implements OnInit{

  

confirmDelete() {
  this.showDeleteFavoriteMessage = true
}

filterMobileAction: string;
onClickFilterIcon() {
  
  this.productPayload.operator = "or"
  this.showFilterMobile = true
}

//@Input() favoriteIds: string[]
filterState: FilterSelectedState
sidebarTitle: string = ""
  showDeleteFavoriteMessage: boolean = false
  updatePriceRange = true
  search_value = "";
  category_value = "";
  countProducts = 0
  tecRes: Product[];
  brands = []
  priceRange: number[];
  priceRangeTemp = [0, 100000000];
  flag: boolean = true;
  loading = false;
  categoryParam: string
  currentRoute: string;
  isProductResponse: boolean = false
  tvFilterSelected: TvFilters
  productPayload:ProductPayload = new ProductPayload
  showFilterMobile: boolean = false;
  typeStore: StoreType
  isPartesPc: boolean
  updateFilters: boolean = true
  isFavoriteView: boolean = false
  favoritesSelected: string[] = []

  favoriteIds = this.router.getCurrentNavigation().extras.state?.['productIds'];

  constructor(
    private service: ProductAtlasService,
    private activatedRoute: ActivatedRoute,
    public brandFilter: BrandFilterService,
    private menuService: MenuService,
    private router: Router,
    private userService: UserService,
    private sortService: SortService,
    private auth: AuthAltasService,
    public uiService: UIService
  ) {
    console.log(this.favoriteIds)

    menuService.storeTypeState$.subscribe(st => this.productPayload.typeStore = st)
   
    this.tecRes = [];
   brandFilter.getBrands()
   brandFilter.getPriceRangeState()
   brandFilter.setFilterList()

    var url = new URL(window.location.href);
    this.currentRoute = url.pathname
   
    let queryBrands = "";
    let queryPriceRange = ""
    let filters = ""
    let operator = ""
    this.search_value = url.searchParams.get("q");
    this.category_value = url.searchParams.get("cat");
    queryBrands = url.searchParams.get("brands");
    queryPriceRange = url.searchParams.get("priceRange");
    filters = url.searchParams.get("filters")
    this.productPayload.operator = url.searchParams.get("operator")
    const sort = url.searchParams.get("sort")
    const page = url.searchParams.get("page")

    this.flag = true
     
    if (this.search_value) {
      this.sidebarTitle = this.search_value
      this.productPayload.search = this.search_value
      console.log(this.search_value)
      brandFilter.updateSort("Relevancia")
      this.priceRange = this.priceRangeTemp
      this.productPayload.search = this.search_value
      this.categoryParam = ""
      menuService.resetLinkTree()
      menuService.addLinkTree({type: "search", value: this.search_value})
      this.getUrlCat()
      this.getUrlFilters(filters)
      this.getUrlSort(sort)
      this.getUrlPriceRange(queryPriceRange)
      this.getUrlBrands(queryBrands)
  }
    else{
      brandFilter.updateSort("Relevancia")
      menuService.resetLinkTree()
      this.search_value = ""
      this.activatedRoute.params.subscribe((params) => {
        let cat = []
        for (let i = 0 ; i <= 2 ; i++){
          if(params[`category${i}`]){
            cat.push(params[`category${i}`])
            menuService.addLinkTree({type: "category", value: params[`category${i}`]})
          }
        }
        this.sidebarTitle = cat[cat.length - 1]
        //brandFilter.categories.next(filterCat)
        if(cat[0] == "partes-pc"){
          this.productPayload.typeStore = StoreType.PARTES_PC
          this.isPartesPc = this.productPayload.typeStore == StoreType.PARTES_PC
        }
        const joinCat = cat.join("/")
        menuService.categoryLink.next(joinCat)
        this.productPayload.category = joinCat
        this.getUrlBrands(queryBrands)
        this.getUrlFilters(filters)
        this.getUrlSort(sort)
        this.getUrlPriceRange(queryPriceRange)
      });
      if(this.currentRoute == "/favoritos" && this.productPayload.category == "" && this.search_value == ""){
        this.isFavoriteView = true
        this.flag = true
        this.productPayload.favoriteIds = userService.getLocalFavorites()
      }
    }
    if(this.productPayload.search || this.productPayload.category || this.productPayload.favoriteIds.length>0)

    this.getSearchResult();
  }
  ngOnInit(): void {
    this.showFilterMobile = false
   
  }

  getUrlCat(){
    
    if(!this.category_value)
      this.category_value = ""
    else{
      this.flag = true;
        //this.priceRange = this.priceRangeTemp
        if(this.search_value){
          const splitCat = this.category_value.split(",")
          this.productPayload.categoryFilter = splitCat.join("/")   
          splitCat.forEach(sc => {

            this.menuService.addLinkTree({type: "category", value: sc})
          })
        } 

    }
  }
  getUrlSort(sort: string){
    if(sort){
      let sortOptions: string[]  = Object.values(SortOptions)
      if (sortOptions.includes(sort)){
        this.brandFilter.updateSort(sort)
        this.productPayload.sort = this.sortConverter(sort)
        
      }
    }else
    this.productPayload.sort = this.sortConverter("Relevancia")
  }
 
  getUrlBrands(queryBrands: string){
    if (queryBrands) {
      this.updatePriceRange = true
      this.flag = false;
      this.updateFilters = true
      this.productPayload.brands = queryBrands.split(",");
      this.brandFilter.brandsSelected.next(this.productPayload.brands);
      this.menuService.addLinkTree({type: "brand", value: queryBrands.toLowerCase()})
      this.filterState = FilterSelectedState.BRAND
      }
      else{
      queryBrands = ""
      this.brandFilter.brandsSelected.next([]);
      }

  }
  getUrlFilters(filters: string){
    if(filters){
  
     this.updatePriceRange = true

      try {
        let filterList = []
        const filter = JSON.parse(filters)
    
        this.brandFilter.setFilters(filter)
        const filterNames = Object.getOwnPropertyNames(filter)
        this.brandFilter.updateFilterListSelected(filterNames)
        
        filterNames.forEach(fn =>{
            filter[fn].forEach(fv => {
              filterList.push(`${fn}_${fv}`)
              this.menuService.addLinkTree({type: "filter", value: `${fn}_${fv}`})

            })
        })
      
        this.productPayload.filterList = filterList
        if(filterList.length == 0){
          this.brandFilter.updateIsFilterEmpty(true)
          
        }
       
   
      } catch (error) {
        
      }
    }
    else{
      this.brandFilter.updateFilterListSelected([])
      this.brandFilter.setFilters({})
    }
  }
  getUrlPriceRange(queryPriceRange: string){
    if(queryPriceRange){
      this.flag = true;
      this.updatePriceRange = false
      this.productPayload.priceRange = queryPriceRange.split(",").map(Number)
      this.brandFilter.updatePriceRange(this.productPayload.priceRange)
     
    }
    else
    this.priceRange = this.priceRangeTemp
  }
  getUrlPage(page: string){
    if(page){
      this.productPayload.page = Number.parseInt(page)

    }
    else
      this.productPayload.page = 1
  }

  getSearchResult() {
    this.loading = true
    console.log(this.productPayload.sort)
    console.log(this.favoriteIds)
    console.log(this.productPayload)
    if(this.favoriteIds){
      this.productPayload.favoriteIds = this.favoriteIds
       this.search()
      }else{
      this.search()
     }
  }

  search(){
  
    this.service.getTecResultUnified(
      this.productPayload,
       )
       .subscribe({
         next: (data) => {
           console.log(data)
           this.setProduct(data)
           this.loading = false;
           console.log(this.loading)
           console.log(this.isProductResponse)
         },
         error: (e) => {
 
           this.loading = false;
         },
       });
  }

  setProduct(data: ProductResponse){
    this.tecRes.push(...data.paginatedResults);
          if(data.totalCount){
            
            this.countProducts = data.totalCount[0].count
          }
           this.isProductResponse = this.tecRes.length > 0
           
           if(data.parameters.length>0){
             if (this.brands.length == 0 && this.filterState != FilterSelectedState.BRAND) {       
               this.brandFilter.updateFilterBrands(data.parameters[0].brands);
               this.brandFilter.updateBrands(data.parameters[0].brands)
              
               
              }
              if(this.updatePriceRange && this.isProductResponse ){
                const priceRange= [data.parameters[0].minPrice, data.parameters[0].maxPrice]
                  this.brandFilter.updatePriceRangeState(priceRange)
              this.brandFilter.updatePriceRange(priceRange);
              this.brandFilter.updateSessionPriceRangeState(priceRange);
              }
            
           if(this.flag){
             
           
           }
          

             this.brandFilter.updateFilterList(this.orderFilter(data.filters))  
             this.brandFilter.categories.next(this.menuService.listaAObjeto(data.parameters[0].categories))
           }
          
  }


onNearEndScroll(){
  if(this.countProducts > this.productPayload.page*this.productPayload.size){
    this.productPayload.page +=1 
    this.flag = false

    this.getSearchResult();

  }
  //this.page += 1;
}


orderFilter(filters: Filters[]){
  filters.sort()
 

  let list = []
  let filter = {}
  let listFilter = []
  filters.forEach(f =>{
    let split_filter = f._id.split("_")
    list.push([split_filter[0], [split_filter[1], f.count]])
  })
  console.log(list)
  list.sort()
  list.forEach(f =>{
    
    if(filter){
      if(!filter[f[0]])
        list = []
    }
    list.push([f[1][0], f[1][1]])
    filter[f[0]] = list  
  })
  return filter
}
sortConverter(sort: string){
  switch(sort){
    case "Mayor precio":
      return {price: -1,}
    case "Menor precio":
      return {price: 1}
    case "A-Z":
      return {name: 1}
    case "Z-A":
      return {name: -1}
    case "Relevancia":
      return {_id: 1}
    default:
      return {_id: -1}
  }
}

favoriteSelected(favotiresSelected: string[]) {
 this.favoritesSelected = favotiresSelected
  }
  deleteFavorites() {
    const user = this.auth.getCurrentUser()
    if(user) {

      this.userService.setUserFavorite(user.id, this.favoritesSelected, user.accessToken).subscribe({
        next: () =>{
            this.showDeleteFavoriteMessage = false
            this.favoritesSelected.forEach(f => this.userService.setLocalFavorites(f))
            this.tecRes = this.tecRes.filter(tr => !this.favoritesSelected.includes (tr._id))
        }
      })
    }

}


}
