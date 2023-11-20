import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductHistory } from "../models/product-history";

const baseUrl = "http://localhost:8080/api/";
@Injectable({
    providedIn: 'root'
  })
  export class ProductDetailService {

    constructor(private http: HttpClient){}

    getProductHistory(id: number, path: string){
        return this.http.get<ProductHistory>(baseUrl+"product-history/"+path+"/"+id)
    }
  }