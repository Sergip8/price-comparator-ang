import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SearchPayload } from "../models/search-payload";
import { BasicData } from "../models/basic-data";
import { SearchTecPayload } from "../models/search-tec-payload";

const baseUrl = 'http://localhost:8080/api/'
@Injectable({
    providedIn: 'root'
  })
  export class SearchService {
  getCategoryRes(value: string, page: number, size: number) {
    return this.http.get<SearchPayload>(baseUrl+`results/category?search=${value}&page=${page}&size=${size}`)
  }
  
    constructor(private http: HttpClient){}
getSearchResults(search_value: string, page: number, size: number, type: string){
    return this.http.get<SearchTecPayload>(baseUrl+`results?search=${search_value}&page=${page}&size=${size}&type=${type}`)
}
nextPage(name: string, page: number, search: string, method: string){
    return this.http.get<BasicData[]>(baseUrl+`results/next?name=${name}&search=${search}&page=${page}&method=${method}`)
}

}