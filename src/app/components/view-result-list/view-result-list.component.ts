import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from "@angular/core";
import { SearchService } from "../../service/search.service";
import { SearchPayload } from "../../models/search-payload";
import { SearchTec } from "../../models/search-tec";
import { SearchTecPayload } from "../../models/search-tec-payload";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { TecDataResponse } from "src/app/models/tec-data-response";
import { BrandFilterService } from "src/app/service/brand-filter.service";
import { MenuService } from "src/app/service/menu-service";

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

  
  @ViewChild('productHeight') elementView: ElementRef;

  constructor(
    private service: SearchService,
    private activatedRoute: ActivatedRoute,
    public brandFilter: BrandFilterService,
    private menuService: MenuService,
    private router: Router
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
    this.search_value = url.searchParams.get("search");
    this.category_value = url.searchParams.get("cat");
    queryBrands = url.searchParams.get("brands");
    queryPriceRange = url.searchParams.get("priceRange");
    this.flag = true;
    if(queryPriceRange){
      this.flag = false;
      this.priceRangeTemp = queryPriceRange.split(",").map(Number)
      brandFilter.priceRange.next(this.priceRangeTemp)
      this.getSearchResult();
    }
    else
    this.priceRange = this.priceRangeTemp
    if (queryBrands) {
    
      this.flag = false;
      this.brandsSelected = queryBrands.split(",");
      brandFilter.brandsSelected.next(this.brandsSelected);
      
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
   
    if (this.search_value) {
      this.priceRange = this.priceRangeTemp
      
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
        this.categoryParam = joinCat
        //console.log(this.categoryParam)
        
        this.getSearchResult()
        
  
       
      });
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
    if(this.currentRoute.includes("/tecnologia")){

      this.service
        .getTecResult(
          this.search_value,
          this.page,
          this.size,
          this.brandsSelected,
          this.category_value,
          this.categoryParam,
          this.priceRangeTemp[0],
          this.priceRangeTemp[1]
        )
        .subscribe({
          next: (data) => {
            //console.log(this.brandFilter.priceRange.value);
            this.tecRes.push(...data.results);
            this.countProducts = data.count
            this.isProductResponse = this.tecRes.length != 0
  
            if (this.brands.length == 0 && this.flag) {       
              this.brandFilter.brands.next(data.brands);
              this.brandFilter.updateBrands(data.brands)
  
            }
            if(this.flag){
              console.log("####Entro##");
              this.brandFilter.priceRange.next(data?.priceRange);
              this.brandFilter.priceRangeState.next(data?.priceRange);
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
    else{
      this.service
      .getMerResult(
        this.search_value,
        this.page,
        this.size,
        this.brandsSelected,
        this.category_value,
        this.categoryParam,
        this.priceRangeTemp[0],
        this.priceRangeTemp[1]
      )
      .subscribe({
        next: (data) => {
          //console.log(this.brandFilter.priceRange.value);
          this.tecRes.push(...data.results);
          this.countProducts = data.count

          if (this.brands.length == 0 && this.flag) {       
            this.brandFilter.brands.next(data.brands);
            this.brandFilter.updateBrands(data.brands)

          }
          if(this.flag){
            console.log("####Entro##");
            this.brandFilter.priceRange.next(data?.priceRange);
            this.brandFilter.priceRangeState.next(data?.priceRange);
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
  }


onNearEndScroll(){
  this.page += 1;
  this.getSearchResult();
}
onPriceRange(){
  console.log("########emitio#########")
  this.flag = false;
  this.tecRes = [];
 //console.log(this.priceRange)
  this.getSearchResult()

}

}
