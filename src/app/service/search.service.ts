import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SearchPayload } from "../models/search-payload";
import { BasicData } from "../models/basic-data";
import { SearchTecPayload } from "../models/search-tec-payload";
import { PartesPc } from "../models/partes-pc";
import { MercadoRequest } from "../models/mercado-request";
import { MercadoData } from "../models/mercado-data";
import { PartesPcData } from "../models/partes-pc-data";
import { TecDataResponse } from "../models/tec-data-response";

const baseUrl = "http://localhost:8080/api/";
@Injectable({
  providedIn: "root",
})
export class SearchService {


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
  getTecResult(
    search_value: string,
    page: number,
    size: number,
    brands: string[],
    catfilter: string,
    cat: string,
    minPrice: number,
    maxPrice: number
  ) {
    return this.http.get<SearchTecPayload>(
      baseUrl +
        `results/tecnologia?search=${search_value}&categoryFilter=${catfilter}&page=${page}&size=${size}&brands=${brands}&category=${cat}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  }
  getMerResult(
    search_value: string,
    page: number,
    size: number,
    brands: string[],
    catfilter: string,
    cat: string,
    minPrice: number,
    maxPrice: number
  ) {
    return this.http.get<SearchTecPayload>(
      baseUrl +
        `results/mercado?search=${search_value}&categoryFilter=${catfilter}&page=${page}&size=${size}&brands=${brands}&category=${cat}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  }
  getlistSubcategories(cat: string) {
    return this.http.get<TecDataResponse[]>(
      baseUrl + `results/cat/tecnologia?search=${cat}`
    );
  }
  getRelatedProducts(name: string, path: string) {
    return this.http.get<TecDataResponse[]>(
      baseUrl + `results/${path}/related/${name}`
    );
  }
  getMerRelatedProducts(name: string) {
    return this.http.get<TecDataResponse[]>(
      baseUrl + `results/mercado/related/${name}`
    );
  }
}
