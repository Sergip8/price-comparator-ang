import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from "@angular/core";
import { SearchService } from "../../service/search.service";
import { SearchPayload } from "../../models/search-payload";
import { SearchTec } from "../../models/search-tec";
import { SearchTecPayload } from "../../models/search-tec-payload";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { TecDataResponse } from "src/app/models/tec-data-response";
import { BrandFilterService } from "src/app/service/brand-filter.service";
import { MenuService } from "src/app/service/menu-service";
import { SortService } from "src/app/service/sort-products.service";
import { TvFilters } from "src/app/models/tv-filters";
import { ProductPayload } from "src/app/models/product-payload";

@Component({
  selector: "app-view-result-list",
  templateUrl: "./view-result-list.component.html",
  styleUrls: ["./view-result-list.component.css"],
})
export class ViewResultListComponent implements OnInit{

  brandsSelected = [];
  split_cat = 0;
  size = 36;
  page = 0;
  search_value = "";
  category_value = "";
  sortValue = ""
  countProducts = 0
  tecRes: TecDataResponse[];
  categories = [];
  brands = [];
  priceRange: number[];
  priceRangeTemp = [0, 100000000];
  flag: boolean;
  loading = true;
  categoryParam: string
  currentRoute: string;
  isProductResponse: boolean = true
  tvFilterSelected: TvFilters
  productPayload:ProductPayload = new ProductPayload


  
  @ViewChild('productHeight') elementView: ElementRef;

  constructor(
    private service: SearchService,
    private activatedRoute: ActivatedRoute,
    public brandFilter: BrandFilterService,
    private menuService: MenuService,
    private router: Router,
    private sortService: SortService
  ) {
    this.tecRes = [];
   brandFilter.getBrands()
   brandFilter.getPriceRangeState()
    //brandFilter.priceRange.subscribe(pr => this.priceRange = pr)
    //console.log(this.tecRes);
    var url = new URL(window.location.href);
    this.currentRoute = url.pathname
    console.log(this.currentRoute)
    let queryBrands = "";
    let queryPriceRange = ""
    let tv_filters = ""
    this.search_value = url.searchParams.get("q");
    this.category_value = url.searchParams.get("cat");
    queryBrands = url.searchParams.get("brands");
    queryPriceRange = url.searchParams.get("priceRange");
    tv_filters = url.searchParams.get("tv_filters")
    this.flag = true;

    if (this.search_value) {
      this.priceRange = this.priceRangeTemp
      this.productPayload.search = this.search_value
      this.categoryParam = ""
      this.getSearchResult();

  }
  
    else{
      console.log(menuService.categoryLink.value)
      this.search_value = ""
      this.activatedRoute.params.subscribe((params) => {
        console.log("#########Params###########")
        let cat = []
        for (let i = 0 ; i <= 2 ; i++){
          if(params[`category${i}`]){
            
            cat.push(params[`category${i}`])
            
          }
        }
        const joinCat = cat.join("/")
        console.log("gato unido "+ joinCat)
        menuService.categoryLink.next(joinCat)
        this.productPayload.category = joinCat
        //console.log(this.categoryParam)
        
        this.getSearchResult()
        
  
       
      });
    }
    if(tv_filters){
      try {
        const filters = JSON.parse(tv_filters)
        brandFilter.setFilters(filters)
       
        console.log(this.productPayload.filter)
        this.getSearchResult();
      } catch (error) {
        
      }
    }
   
    if(queryPriceRange){
      this.flag = false;
      this.productPayload.priceRange = queryPriceRange.split(",").map(Number)
      brandFilter.updatePriceRange(this.priceRangeTemp)
      this.getSearchResult();
    }
    else
    this.priceRange = this.priceRangeTemp
    if (queryBrands) {
    
      this.flag = false;
      this.productPayload.brands = queryBrands.split(",");
      brandFilter.brandsSelected.next(this.productPayload.brands);
      
      }
      else{
      queryBrands = ""
      brandFilter.brandsSelected.next([]);
      }

    if(!this.category_value)
      this.category_value = ""
    else{
      this.priceRange = this.priceRangeTemp
      
      this.categoryParam = ""
      this.getSearchResult();
    }
   
   
  }

  ngOnInit(): void {
    // if(!this.tecRes && !this.priceRange)
    // this.priceRangeTemp = this.priceRange = [0, 1000000]
    // const range = localStorage.getItem("range")
    // const results = localStorage.getItem("searchRes")
    // if(range)
    // this.priceRange = JSON.parse(range)
    // if(results){
    //   this.tecRes = JSON.parse(results)
    //   this.search_value =  this.tecRes.query
    // }
  
  }


  getSearchResult() {
    this.loading = true
      this.service
        .getTecResult(
       this.productPayload
        )
        .subscribe({
          next: (data) => {
            console.log(data)
            this.tecRes.push(...data.results);
            this.countProducts = data.count
            this.isProductResponse = this.tecRes.length != 0
           
  
            if (this.brands.length == 0 && this.flag) {       
              this.brandFilter.updateFilterBrands(data.brands);
              this.brandFilter.updateBrands(data.brands)
  
            }
            if(this.flag){
              console.log("####Entro##");
              this.brandFilter.updatePriceRange(data?.priceRange);
              this.brandFilter.updateSessionPriceRangeState(data?.priceRange);
              this.brandFilter.updatePriceRangeState(data?.priceRange)
              console.log(this.priceRange)
            }
            
            this.brandFilter.categories.next(
              data.categories.map((c) => {
                let cf = c.split("/");
                return cf[cf.length - 2];
              })
            );
            // if (this.searchMethod == 'category' && data.categories[0].startsWith("/"+ this.search_value))
            //   this.split_cat = -1
  
            this.loading = false;
            //console.log(this.tecRes);
          },
          error: (e) => {
            //console.log(e);
            this.loading = false;
          },
        });
  
  }


onNearEndScroll(){
  //this.page += 1;
  this.productPayload.page +=1 
  this.getSearchResult();
}
onPriceRange(){
  console.log("########emitio#########")
  this.flag = false;
  this.tecRes = [];
 //console.log(this.priceRange)
  this.getSearchResult()

}
sortProducts(sortSelected: string) {
  this.productPayload.page = 0
  this.tecRes = []
  console.log(sortSelected)
  this.productPayload.sort = sortSelected
  this.getSearchResult()
}

}
