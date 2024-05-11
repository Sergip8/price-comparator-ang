import { Injectable } from "@angular/core";
import { SuggestedProducts, TecDataResponse } from "../models/tec-data-response";
import { HttpClient } from "@angular/common/http";
import { MercadoRequest } from "../models/mercado-request";
import { PartesPcData } from "../models/partes-pc-data";
import { ProductPayload } from "../models/product-payload";
import { SearchTecPayload, SearchTecPayloadUnified } from "../models/search-tec-payload";
import * as Realm from "realm-web";
import { ProductResponse } from "../models/product-atlas";
import { CarouselImg } from "../components/home/carousel";


const baseUrl = "https://us-east-1.aws.data.mongodb-api.com/app/application-0-pidid/endpoint/";
@Injectable({
  providedIn: "root",
})
export class ProductAtlasService {

  user: any

  getSuggestedProducts(search: string) {
    return this.http.get<SuggestedProducts[]>(baseUrl+"results/suggested/"+search)
  }

  getStores(ids: string[]) {
    return this.http.post<TecDataResponse[]>(baseUrl+"stores",{ids: ids})
  }

  getDiscountTecProducts(cat: string) {
    return this.http.get<TecDataResponse[]>(baseUrl+`results/home_products?cat=${cat}`)
  }

  constructor(private http: HttpClient) {}

  getMercadoCategoryRes(value: string, page: number, size: number) {
    return this.http.get<MercadoRequest[]>(
      baseUrl +
        `results/mercado/category?search=${value}&page=${page}&size=${size}`
    );
  }
 
 
  getPartesPc(search_value: string, page: number, size: number) {
    return this.http.get<PartesPcData[]>(
      baseUrl +
        `results/partes_pc?search=${search_value}&page=${page}&size=${size}`
    );
  }
  

 
  getTecResultUnified(payload: ProductPayload) {
   
    return this.http.post<ProductResponse>(
      baseUrl + `results/products`, payload);
   
  }
  getMerResult(
    search_value: string,
    page: number,
    size: number,
    brands: string[],
    catfilter: string,
    cat: string,
    minPrice: number,
    maxPrice: number,
    sort: string
  ) {
    return this.http.get<SearchTecPayload>(
      baseUrl +
        `results/mercado?search=${search_value}&categoryFilter=${catfilter}&page=${page}&size=${size}&brands=${brands}&category=${cat}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`
    );
  }
 
  getlistSubcategories(cat: string) {
    return this.http.get<TecDataResponse[]>(
      baseUrl + `results/cat/tecnologia?search=${cat}`
    );
  }
  getRelatedProducts(category: string) {
    return this.http.get<TecDataResponse[]>(
      baseUrl + `results/home_products?cat=` +category
    );
  }
  getRelatedPartesPc(category: string) {
    return this.http.get<TecDataResponse[]>(
      baseUrl + `results/home_products?cat=` +category
    );
  }
  getMerRelatedProducts(name: string) {
    return this.http.get<TecDataResponse[]>(
      baseUrl + `results/mercado/related/${name}`
    );
  }

  getCarouselImages(){
    return this.http.get<CarouselImg[]>(baseUrl + "images/carousel")
  }


}
