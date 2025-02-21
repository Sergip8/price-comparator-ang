import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HistoryChart, ProductHistory } from "../models/product-history";
import { TecDataResponseUnified } from "../models/tec-data-response";

const baseUrl = "https://us-east-1.aws.data.mongodb-api.com/app/application-0-pidid/endpoint/";
@Injectable({
    providedIn: 'root'
  })
  export class ProductDetailService {
    getProductsHistory(ids: string[], category: string) {
      return this.http.post<HistoryChart[]>(baseUrl+`history_v2`, {cat: category, productIds: ids})
    }
    
    constructor(private http: HttpClient){}
    
    getProductById(productId: string) {
      return this.http.get<TecDataResponseUnified>(baseUrl+"results/product/"+productId)
    }
    getPartesPcById(partesPcId: string){
      return this.http.get<TecDataResponseUnified>(baseUrl+"partes-pc/details/"+partesPcId)
    }
    
    getProductHistory(id: string, cat: string){
        return this.http.get<ProductHistory>(baseUrl+`history?productId=${id}&cat=${cat}`)
    }
   

  }