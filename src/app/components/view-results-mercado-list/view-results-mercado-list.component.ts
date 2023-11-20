import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MercadoRequest } from "src/app/models/mercado-request";
import { SearchPayload } from "src/app/models/search-payload";
import { SearchService } from "src/app/service/search.service";

@Component({
  selector: "app-view-results-mercado-list",
  templateUrl: "./view-results-mercado-list.component.html",
  styleUrls: ["./view-results-mercado-list.component.css"],
})
export class ViewResultsMercadoListComponent {
  page_d1 = 0;
  page_exito = 0;
  page_olimpica = 0;
  page_jumbo = 0;
  page_carulla = 0;
  size = 20;
  page = 0;
  search_value = "";
  searchCategory = "";
  res!: SearchPayload;
  searchMethod = "";
  mercadoReq: MercadoRequest;
  styles = {
    card: { width: "150px", height: "250px", "border-radius": "0" },
    img: { width: "40px", height: "120px" },
  };

  constructor(
    private service: SearchService,
    private activatedRoute: ActivatedRoute
  ) {
    var url = new URL(window.location.href);
    this.search_value = url.searchParams.get("search");
    if(this.search_value){
      this.getSearchResult()
    }
    // this.activatedRoute.params.subscribe((params) => {
    //   if (params["search"]) {
    //     this.search_value = params["search"];
    //     console.log(this.search_value);
    //     this.getSearchResult();
    //   }
    //   if (params["category"]) this.searchCategory = params["category"];
    //   this.getCategoryResult();
    // });
  }

  getSearchResult() {
    this.service.getMercado(this.search_value, this.page, this.size, 0, 1000000).subscribe({
      next: (data) => {
        this.mercadoReq = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }


  

  // search(value: string){
  //   this.search_value = value
  //   this.searchMethod = "search"
  //   this.priceRangeTemp = this.priceRange = [0, 100000000]
  //   this.flag = true
  //   this.getSearchResult()
  // }

}
