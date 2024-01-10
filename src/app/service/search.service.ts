import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SearchPayload } from "../models/search-payload";
import { BasicData } from "../models/basic-data";
import { SearchTecPayload, SearchTecPayloadUnified } from "../models/search-tec-payload";
import { PartesPc } from "../models/partes-pc";
import { MercadoRequest } from "../models/mercado-request";
import { MercadoData } from "../models/mercado-data";
import { PartesPcData } from "../models/partes-pc-data";
import { SuggestedProducts, TecDataResponse, TecDataResponseUnified } from "../models/tec-data-response";
import { TvFilters } from "../models/tv-filters";
import { ProductPayload } from "../models/product-payload";
import { MenuService, StoreType } from "./menu-service";

const baseUrl = "http://localhost:8080/api/";
@Injectable({
  providedIn: "root",
})
export class SearchService {
  getSuggestedProducts(search: string) {
    return this.http.get<SuggestedProducts[]>(baseUrl+"results/suggested/"+search)
  }

  getStores(ids: string[]) {
    return this.http.get<TecDataResponse[]>(baseUrl+"results/stores/"+ids)
  }

  getDiscountTecProducts(cat: string) {
    return this.http.get<TecDataResponse[]>(baseUrl+`results/discount_tec?cat=${cat}`)
  }

  constructor(private http: HttpClient) {}

  getMercadoCategoryRes(value: string, page: number, size: number) {
    return this.http.get<MercadoRequest[]>(
      baseUrl +
        `results/mercado/category?search=${value}&page=${page}&size=${size}`
    );
  }
  getCategoryResults(
    search_value: string,
    page: number,
    size: number,
    type: string,
    lowPrice: number,
    highPrice: number
  ) {
    return this.http.get<SearchTecPayload>(
      baseUrl +
        `results/category?search=${search_value}&page=${page}&size=${size}&type=${type}&low=${lowPrice}&high=${highPrice}`
    );
  }

  getSearchResults(
    search_value: string,
    page: number,
    size: number,
    type: string,
    lowPrice: number,
    highPrice: number
  ) {
    return this.http.get<SearchTecPayload>(
      baseUrl +
        `results?search=${search_value}&page=${page}&size=${size}&type=${type}&low=${lowPrice}&high=${highPrice}`
    );
  }
  nextPage(name: string, page: number, search: string, method: string) {
    return this.http.get<MercadoData[]>(
      baseUrl +
        `results/next?name=${name}&search=${search}&page=${page}&method=${method}`
    );
  }
  getPartesPc(search_value: string, page: number, size: number) {
    return this.http.get<PartesPcData[]>(
      baseUrl +
        `results/partes_pc?search=${search_value}&page=${page}&size=${size}`
    );
  }
  getMercado(search_value: string, page: number, size: number,  minPrice: number, maxPrice: number) {
    return this.http.get<MercadoRequest>(
      baseUrl +
        `results/mercado?search=${search_value}&page=${page}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  }
  getPartesPcNext(search_value: string, page: number, store: string) {
    return this.http.get<PartesPcData[]>(
      baseUrl +
        `results/partes_pc/next?search=${search_value}&page=${page}&store=${store}`
    );
  }
  getTecResult(payload: ProductPayload) {
    return this.http.post<SearchTecPayload>(
      baseUrl + `results/tecnologia`, payload);
  }
  getTecResultUnified(payload: ProductPayload) {
   
    return this.http.post<SearchTecPayloadUnified>(
      baseUrl + `results/tecnologia-unified`, payload);
   
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
    return this.http.post<TecDataResponse[]>(
      baseUrl + `results/category/related`, category
    );
  }
  getRelatedPartesPc(category: string) {
    return this.http.post<TecDataResponse[]>(
      baseUrl + `partes-pc/related`, category
    );
  }
  getMerRelatedProducts(name: string) {
    return this.http.get<TecDataResponse[]>(
      baseUrl + `results/mercado/related/${name}`
    );
  }
}
