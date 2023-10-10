import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from "@angular/core";
import { SearchService } from "../../service/search.service";
import { SearchPayload } from "../../models/search-payload";
import { SearchTec } from "../../models/search-tec";
import { SearchTecPayload } from "../../models/search-tec-payload";
import { ActivatedRoute } from "@angular/router";
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
  
  tecRes: TecDataResponse[];
  categories = [];
  brands = [];
  priceRange: number[];
  priceRangeTemp = [0, 100000000];
  flag: boolean;
  loading = true;
  categoryParam: string

  
  @ViewChild('productHeight') elementView: ElementRef;

  constructor(
    private service: SearchService,
    private activatedRoute: ActivatedRoute,
    public brandFilter: BrandFilterService,
    private menuService: MenuService
  ) {
    this.tecRes = [];
    brandFilter.priceRange.subscribe(pr => this.priceRange = pr)
    console.log(this.tecRes);
    var url = new URL(window.location.href);
    let queryBrands = "";
    this.search_value = url.searchParams.get("search");
    this.category_value = url.searchParams.get("cat");
    queryBrands = url.searchParams.get("brands");
    if (queryBrands) {
   
      this.flag = false;
      this.brandsSelected = queryBrands.split(",");
      brandFilter.brandsSelected.next(this.brandsSelected);
    }
    if (!this.category_value) {
      this.category_value = ""
    }
    if (this.search_value) {
      this.categoryParam = ""
      this.flag = true;
      this.getSearchResult();

    }
  
    console.log(this.search_value);

    if(!this.search_value){
      
      this.activatedRoute.params.subscribe((params) => {
        console.log("#########Params###########")
        for (let i = 2 ; i >= 0 ; i--){
          if(params[`category${i}`]){
            this.search_value = ""
            this.flag = true;
            this.categoryParam = params[`category${i}`].replaceAll("-"," ")
            break
          }
        }
        
        
        this.getSearchResult()
        console.log(this.categoryParam)
  
       
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
    this.service
      .getTecResult(
        this.search_value,
        this.page,
        this.size,
        this.brandsSelected,
        this.category_value,
        this.categoryParam,
        this.priceRange[0],
        this.priceRange[1]
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.tecRes.push(...data.results);

          if (this.brands.length == 0 && this.flag) {
            console.log("####Entro##");
            this.brandFilter.brands.next(data.brands);
          }
          if(this.flag)
          this.brandFilter.priceRange.next(data?.priceRange);
          
          this.brandFilter.categories.next(
            data.categories.map((c) => {
              let cf = c.split("/");
              return cf[cf.length - 1];
            })
          );
          // if (this.searchMethod == 'category' && data.categories[0].startsWith("/"+ this.search_value))
          //   this.split_cat = -1

          this.loading = false;
          console.log(this.tecRes);
        },
        error: (e) => {
          console.log(e);
          this.loading = false;
        },
      });
  }

  catSelected(value: string) {
    this.search_value = value;
    this.tecRes = [];
    this.brands = [];
    this.loading = true;
    this.getSearchResult();
  }
  brandList(value: any) {
    this.loading = true;
    if (value?.selected) {
      this.brandsSelected.push(value.value);
      this.brands = this.brands.filter((v) => v != value.value);

      this.brands.unshift(value.value);
    }
    if (!value?.selected)
      this.brandsSelected = this.brandsSelected.filter((v) => v != value.value);
    console.log(this.brandsSelected);
    this.tecRes = [];

    this.getSearchResult();
  }

onNearEndScroll(){
  this.page += 1;
  this.getSearchResult();
}
onPriceRange(){
  console.log("########emitio#########")
  this.flag = false;
  this.tecRes = [];
  console.log(this.priceRange)
  this.getSearchResult()

}

}
