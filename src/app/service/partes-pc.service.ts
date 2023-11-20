import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PartesPcData } from "../models/partes-pc-data";


const baseUrl = 'http://localhost:8080/api/'
@Injectable({
    providedIn: 'root'
  })
  export class PartesPcService {


    constructor(private http: HttpClient){}


    getPartesPcSample(){
        return this.http.get<PartesPcData[]>(baseUrl +"partes-pc/home")
    }
  }
