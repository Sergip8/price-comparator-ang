import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductHistory } from "../models/product-history";
import { TecDataResponseUnified } from "../models/tec-data-response";

const baseUrl = "http://localhost:8080/api/";
@Injectable({
    providedIn: 'root'
  })
  export class ProductDetailService {
    
    constructor(private http: HttpClient){}
    
    getProductById(productId: string) {
      return this.http.get<TecDataResponseUnified>(baseUrl+"results/product/"+productId)
    }
    getPartesPcById(partesPcId: string){
      return this.http.get<TecDataResponseUnified>(baseUrl+"partes-pc/details/"+partesPcId)
    }
    
    getProductHistory(id: string){
        return this.http.get<ProductHistory>(baseUrl+"product-history/"+id)
    }
   

  }