import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { TecDataResponse } from "../models/tec-data-response";



@Injectable({
    providedIn: "root",
    
  })
  export class UserService{
   
    baseUrl = environment.apiUrl
    
    favorities = new BehaviorSubject<number[]>(this.getFavoriteCookie())
    constructor(private http: HttpClient, private cookieService: CookieService){}
    
    syncFavorities(email: string, fav: number[]) {
      return this.http.post<number[]>(this.baseUrl+ "users/sync-favorites",{email: email, fav:fav})
    }
    setUserFavorite(userId: string, productId: number){
        return this.http.post<number[]>(this.baseUrl + "users/set-favorite", {userId: userId, productId:productId})
    }
    getUserFavorites(email: string){
        return this.http.post<number[]>(this.baseUrl+ "users/get-favorites", email)
    }

    setFavoriteCookie(fav: number[]= []){
      this.cookieService.set('fav', fav.toString(), {path:'/'});
      //this.getFavoriteCookie()
    }
    getFavoriteCookie(): number[]{
      if(this.cookieService.get('fav')){
        const fav = this.cookieService.get('fav').split(",").map(num => parseInt(num, 10))
        console.log(fav)
        
        return fav
      }
      return []
    }
    getFavoriteProducts(email: string){
     return this.http.post<TecDataResponse[]>(this.baseUrl + "users/favorite-products", email)
    }

    removeFavorite(id: number) {
     return this.http.delete(this.baseUrl + "users/remove-favorite/"+id)
    }

    removeFavoriteIdCookie(id: number){
      let idList = this.getFavoriteCookie()
      idList = idList.filter(idf => idf !== id)
      this.setFavoriteCookie(idList)
    }
  }