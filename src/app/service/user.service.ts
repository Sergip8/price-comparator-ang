import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { TecDataResponse } from "../models/tec-data-response";



@Injectable({
    providedIn: "root",
    
  })
  export class UserService{
   

    private favoriteSelected = new BehaviorSubject<string[]>([]) 
    favoriteSelected$ = this.favoriteSelected.asObservable()
   
    baseUrl = environment.apiUrl
    
  //favorities = new BehaviorSubject<number[]>(this.getFavoriteCookie())
    constructor(private http: HttpClient){}
    
    updateFavoriteSelected(favorite: string[]){
      this.favoriteSelected.next(favorite)
    }

    syncFavorities(email: string, fav: number[]) {
      return this.http.post<number[]>(this.baseUrl+ "users/sync-favorites",{email: email, fav:fav})
    }
    setUserFavorite(userId: string, productId: string[], token: string){

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` });
        console.log(productId)
        return this.http.post(this.baseUrl + "favorite", {userId: userId, favorite:productId},{headers: headers})
    }
    getUserFavorites(id: string, token: string){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` });
        return this.http.get<string[]>(this.baseUrl+ "favorite?userId="+ id,{headers: headers})
    }

    // setFavoriteCookie(fav: number[]= []){
    //   this.cookieService.set('fav', fav.toString(), {path:'/'});
    //   //this.getFavoriteCookie()
    // }
    // getFavoriteCookie(): number[]{
    //   if(this.cookieService.get('fav')){
    //     const fav = this.cookieService.get('fav').split(",").map(num => parseInt(num, 10))
    //     console.log(fav)
        
    //     return fav
    //   }
    //   return []
    // }
    getFavoriteProducts(email: string){
     return this.http.post<TecDataResponse[]>(this.baseUrl + "users/favorite-products", email)
    }

    removeFavorite(id: number) {
     return this.http.delete(this.baseUrl + "users/remove-favorite/"+id)
    }

    // removeFavoriteIdCookie(id: number){
    //   let idList = this.getFavoriteCookie()
    //   idList = idList.filter(idf => idf !== id)
    //   this.setFavoriteCookie(idList)
    // }

    setLocalFavorites(favorite: string){
      const fav = sessionStorage.getItem("userFav")
      if(fav){

        const favList = JSON.parse(fav)
        const index = favList.indexOf(favorite)
        if(index == -1){
          favList.push(favorite)
        }else{
          favList.splice(index, 1)
        }
        sessionStorage.setItem("userFav", JSON.stringify(favList))
      }else{
        sessionStorage.setItem("userFav", JSON.stringify([favorite]))
        
      }
    }
    getLocalFavorites(){
      const fav = sessionStorage.getItem("userFav")
      if(fav){

        return JSON.parse(fav)
      }
      return []
    }
    syncLocalFav(favorites: string[]){
      sessionStorage.setItem("userFav", JSON.stringify(favorites))
    }

  }