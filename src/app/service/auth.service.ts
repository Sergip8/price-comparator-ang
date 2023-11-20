import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, from } from "rxjs";
import { environment } from "src/environments/environment";

import { GoogleLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";
import { User } from "../models/user";

const apiUrl = "http://localhost:8080";
const header = new HttpHeaders().set('Content-type', 'application/json');
@Injectable({
    providedIn: "root",
  })
  export class AuthService{

    private baseUrl = environment.apiUrl
    private loginStatus = new BehaviorSubject<boolean>(false)
    private userLogged = new BehaviorSubject<User>(this.getUser())

    constructor(private http: HttpClient, private socialAuthService: SocialAuthService){}

    get user$() {
      return this.userLogged.asObservable();
   }
    socialGoogleLogin(){
     this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(token =>{
      console.log(token)
      this.verifyToken(token)
     })
    }

login(){
  this.socialAuthService.authState.subscribe({
    next: user =>{
      localStorage.setItem("user", JSON.stringify(user))
      this.userLogged.next({username: user.name, email:user.email})
      this.loginStatus.next(true)
      console.log(user);

    },
    error: e =>{
      this.logout()
    }
  });
}
logout(){
  this.socialAuthService.signOut().then( user =>{
    localStorage.removeItem("user")
    this.loginStatus.next(false)
  })
}
refreshToken(): void {
  this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
}

    
  //   loginWithGoogle(credential: string) {
  //    return this.http.post(this.baseUrl + 'auth-google', JSON.stringify(credential), {headers: header, withCredentials: true})
  //   }



  //   login(): Observable<any> {
  //     // Realiza la redirección a la URL de autorización del backend
  //     window.location.href = `${apiUrl}/oauth2/authorization/google`;
  //     return null; // Puedes cambiar esto según tus necesidades
  //   }
  //   public signOutExternal = () => {
  //     localStorage.removeItem("token");
  //     console.log("token deleted")
  // }

  //   refreshToken(): Observable<any> {
  //     const header = new HttpHeaders().set('Content-type', 'application/json');
  //     return this.http.get(this.baseUrl + "RefreshToken", { headers: header, withCredentials: true });
  //   }
  
  //   revokeToken(): Observable<any> {
  //     const header = new HttpHeaders().set('Content-type', 'application/json');
  //     return this.http.delete(this.baseUrl + "RevokeToken/" + this.username.value, { headers: header, withCredentials: true });
  //   }
  
  //   saveToken(token:string) {
  //     localStorage.setItem('token', token)
  //   }
  
  //   saveUsername(username:string) {
  //     localStorage.setItem('username', username)
  //   }
  
  //   loggedIn(): boolean {
  //     if (localStorage.getItem('token')) {
  //       return true;
  //     }
  //     return false;
  //   }
  
  //   setLoginStatus(val:any) {
  //     this.loginStatus.next(val)
  //   }
  
  //   setUsername(val:any) {
  //     this.username.next(val)
  //   }
  
  

      loggedIn(): boolean {
         return !!localStorage.getItem("user") 
    }

    verifyToken(token: string){
      
        const header = {"Authorization": "Bearer " + token}
        console.log(token)
       this.http.get<any>(environment.apiUrl+"users/google", {headers: header}).subscribe({
        next: user => {
          localStorage.setItem("G-user", JSON.stringify(user))
          console.log(user)
        },
        error : () => this.logout()
       })
      
     
    }
    getUser():User{
      return {email:JSON.parse(localStorage.getItem("user"))?.email,
      username: JSON.parse(localStorage.getItem("user"))?.name
       }
    }
    getEmail():string{
      return JSON.parse(localStorage.getItem("user"))?.email
    }
    
  }