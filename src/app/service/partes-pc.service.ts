import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PartesPcData } from "../models/partes-pc-data";
import { AuthAltasService } from "./auth-atlas.service";
import { Observable } from "rxjs";
import { TecDataResponse } from "../models/tec-data-response";



const baseUrl = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-pidid/endpoint/'
@Injectable({
    providedIn: 'root'
  })
  export class PartesPcService {
 user: any

    constructor(private http: HttpClient, private auth: AuthAltasService){
      
    }

 


    getPartesPcSample(){
        return this.http.get<TecDataResponse[]>(baseUrl +"partes_pc/sample")
    }

    // async getPartesPcHome(){
    //   const user = await this.auth.getUser()
 
    //   return await user.functions.callFunction("getPartesPcSampleAng")

    //  }
  
  
  }
