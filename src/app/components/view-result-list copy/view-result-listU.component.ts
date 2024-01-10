import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from "@angular/core";
import { SearchService } from "../../service/search.service";
import { SearchPayload } from "../../models/search-payload";
import { SearchTec } from "../../models/search-tec";
import { FilterData, SearchTecPayload } from "../../models/search-tec-payload";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { TecDataResponse, TecDataResponseUnified } from "src/app/models/tec-data-response";
import { BrandFilterService } from "src/app/service/brand-filter.service";
import { MenuService, StoreType } from "src/app/service/menu-service";
import { SortService } from "src/app/service/sort-products.service";
import { TvFilters } from "src/app/models/tv-filters";
import { ProductPayload } from "src/app/models/product-payload";
import { SortOptions } from "./sort-select";
import { UIService } from "src/app/service/ui.service";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-view-result-list",
  templateUrl: "./view-result-listU.component.html",
  styleUrls: ["./view-result-listU.component.css"],
  animations: [
    trigger('sidebarTrigger', [
      // To add a cool "enter" animation for the sidebar
    

      // To define animations based on trigger actions
      state('open', style({ transform: 'translateX(0%)' })),
      state('close', style({ transform: 'translateX(100%)', display: 'none' })),
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
filterMobileAction: string;
onClickFilterIcon() {
  this.filterMobileAction= ''
  this.productPayload.operator = "or"
  this.showFilterMobile = true
 
}



  updatePriceRange = true
  search_value = "";
  category_value = "";
  countProducts = 0
  tecRes: TecDataResponseUnified[];
  brands = []
  priceRange: number[];
  priceRangeTemp = [0, 100000000];
  flag: boolean = true;
  loading = true;
  categoryParam: string
  currentRoute: string;
  isProductResponse: boolean = true
  tvFilterSelected: TvFilters
  productPayload:ProductPayload = new ProductPayload
  showFilterMobile: boolean = false;
  typeStore: StoreType
  isPartesPc: boolean
  updateFilters: boolean = true

  constructor(
    private service: SearchService,
    private activatedRoute: ActivatedRoute,
    public brandFilter: BrandFilterService,
    private menuService: MenuService,
    private router: Router,
    private sortService: SortService,
    public uiService: UIService
  ) {
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
      brandFilter.updateSort("Relevancia")
      this.priceRange = this.priceRangeTemp
      this.productPayload.search = this.search_value
      this.categoryParam = ""
      menuService.resetLinkTree()
      menuService.addLinkTree({type: "search", value: this.search_value})
      this.getUrlCat()
      this.getUrlBrands(queryBrands)
      this.getUrlFilters(filters)
      this.getUrlSort(sort)
      this.getUrlPriceRange(queryPriceRange)
      this.getSearchResult();

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
        this.getSearchResult()
   
        
  
       
      });
    }
   
   
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
      
        this.productPayload.filter = filterList
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
    
      this.service
        .getTecResultUnified(
       this.productPayload,
        
        )
        .subscribe({
          next: (data) => {
            console.log(data)
            this.tecRes.push(...data[0].response);
            this.countProducts = data[0].payload[0].count
            this.isProductResponse = this.tecRes.length != 0
           
  
            if (this.brands.length == 0 && this.flag) {       
              this.brandFilter.updateFilterBrands(data[0].payload[0].brands);
              this.brandFilter.updateBrands(data[0].payload[0].brands)
  
            }
            if(this.updatePriceRange){
              const priceRange = [data[0].payload[0].minPrice, data[0].payload[0].maxPrice]
              this.brandFilter.updatePriceRange(priceRange);
              this.brandFilter.updatePriceRangeState(priceRange)
              this.brandFilter.updateSessionPriceRangeState(priceRange);
            }
            if(this.flag){
              
            
            }
            this.brandFilter.updateFilterList(this.orderFilter(data[0].filterGroup))
            //if(this.search_value){
              this.brandFilter.categories.next(this.menuService.listaAObjeto(data[0].payload[0].categories))
             
           // }
            
            // this.brandFilter.categories.next(
            //   data.categories.map((c) => {
            //     let cf = c.split("/");
            //     return cf[cf.length - 1];
            //   })
            // );
            
            // if (this.searchMethod == 'category' && data.categories[0].startsWith("/"+ this.search_value))
            //   this.split_cat = -1
  
            this.loading = false;
           
          },
          error: (e) => {
  
            this.loading = false;
          },
        });
  
  }


onNearEndScroll(){
  if(this.countProducts > this.productPayload.page*this.productPayload.size){
    this.productPayload.page +=1 
    this.flag = false

    this.getSearchResult();

  }
  //this.page += 1;
}
// onPriceRange(){
//   console.log("########emitio#########")
//   this.flag = false;
//   this.updatePriceRange = false
//   this.tecRes = [];
//  //console.log(this.priceRange)
//   this.getSearchResult()

// }
// sortProducts(sortSelected: string) {
//   this.productPayload.page = 0
//   this.tecRes = []
//   console.log(sortSelected)
//   this.productPayload.sort = sortSelected
//   this.getSearchResult()
// }

orderFilter(filters: FilterData[]){
  filters.sort()
 

  let list = []
  let filter = {}
  let listFilter = []
  filters.forEach(f =>{
    let split_filter = f.filterName[0].split("_")
    list.push([split_filter[0], [split_filter[1], f.count]])
  })
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
      return {sort: 1, field: "price"}
    case "Menor precio":
      return {sort: 0, field: "price"}
    case "A-Z":
      return {sort: 0, field: "name"}
    case "Z-A":
      return {sort: 1, field: "name"}
    case "Relevancia":
      return {sort: 1, field: "_id"}
    default:
      return {sort: 0, field: "_id"}
  }
}
}
