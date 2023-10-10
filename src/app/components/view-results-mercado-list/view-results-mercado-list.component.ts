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
  size = 10;
  page = 0;
  search_value = "";
  searchCategory = "";
  res!: SearchPayload;
  searchMethod = "";
  mercadoReq: MercadoRequest[];
  styles = {
    card: { width: "150px", height: "250px", "border-radius": "0" },
    img: { width: "40px", height: "120px" },
  };

  constructor(
    private service: SearchService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params["search"]) {
        this.search_value = params["search"];
        console.log(this.search_value);
        this.getSearchResult();
      }
      if (params["category"]) this.searchCategory = params["category"];
      this.getCategoryResult();
    });
  }

  getSearchResult() {
    this.searchMethod = "search";

    this.service.getMercado(this.search_value, this.page, this.size).subscribe({
      next: (data) => {
        this.mercadoReq = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }

  getCategory(value: string) {
    this.search_value = value;
    this.searchMethod = "category";
    this.getCategoryResult();
  }

  getCategoryResult() {
    this.searchMethod = "category";
    this.service
      .getMercadoCategoryRes(this.searchCategory, this.page, this.size)
      .subscribe({
        next: (data) => {
          this.mercadoReq = data;
          console.log(data);
        },
      });
  }

  // search(value: string){
  //   this.search_value = value
  //   this.searchMethod = "search"
  //   this.priceRangeTemp = this.priceRange = [0, 100000000]
  //   this.flag = true
  //   this.getSearchResult()
  // }
  nextPage(mercado: MercadoRequest, index: number) {
    mercado.page += 1;
    console.log(this.searchMethod);
    this.service
      .nextPage(
        mercado.store,
        mercado.page,
        this.search_value ? this.search_value : this.searchCategory,
        this.searchMethod
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.mercadoReq[index].data.push(...data);
        },
      });
  }
}
