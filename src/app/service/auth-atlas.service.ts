import { Injectable } from "@angular/core";
import * as Realm from "realm-web";
import { BehaviorSubject, Observable } from "rxjs";
import { environment, mongoAtlas } from "src/environments/environment";


export enum SignInUp{
  SIGNIN,
  SIGNUP
}

const app = new Realm.App({id: mongoAtlas.appKey})
@Injectable({
    providedIn: "root",
  })
  
  export class AuthAltasService{



  async signUpWithEmailAndPassword(email: string, password: string) {
    
    await app.emailPasswordAuth.registerUser({email,password});
  }
   async confirmEmail // from the new window after the user has successfully authenticated.
        (token: string, tokenId: string) {
         
           const res = await app.emailPasswordAuth.confirmUser({ token, tokenId });
          sessionStorage.setItem("emailConfirm", "1")
    }
  async LogInWithEmailAndPassword(email: string, password: string) {
    console.log(email, password)
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await app.logIn(credentials);
      this._user$.next(user)
    

  }

    async loginWithFacebook() {
      try {
        // Redirige al usuario a la pantalla de inicio de sesión de Facebook y luego vuelve a la aplicación
        const redirectUri = "http://localhost:4200/handleOAuthFbLogin";
        const credentials = Realm.Credentials.facebook(redirectUri);
        // Calling logIn() opens a Facebook authentication screen in a new window.
        const user = await app.logIn(credentials);
        // The app.logIn() promise will not resolve until you call `Realm.handleAuthRedirect()`
        // from the new window after the user has successfully authenticated.
        console.log(`Logged in with id: ${user.id}`);
      } catch (error) {
        console.error('Error de autenticación con Facebook:', error);
      }
    }

    

      private _user$ = new BehaviorSubject<Realm.User | null>(null);
    

      public set setUser(user: Realm.User) {
        this._user$.next(user);
      }
      
        public get user(): Observable<Realm.User | null> {
          return this._user$.asObservable();
        }

    // async loginUser(){
    //     const payload = {
    //         username: "user",
    //         password: "123456"
    //         }  
    //         const credentials = Realm.Credentials.apiKey(mongoAtlas.apiKey);
    //         this.httpUser = await app.logIn(credentials, false);
    //         this.tokenExpired(this.getToken())

    //         this.setToken = this.getToken()

      
    //    }
      //  getToken(){
      //   return localStorage.getItem(`${mongoAtlas.localStoreString}:accessToken`)
      //  }

       tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        console.log(expiry)
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
      }

      // async refreshToken(){
      //   await this.httpUser.refreshAccessToken()
      // }

      async loginWithGoogle(idToken: string){
        const credentials = Realm.Credentials.google({idToken: idToken });
        const user = await app.logIn(credentials);
        this._user$.next(user)
        return user
      }

      storeUserId(id: string){
        localStorage.setItem("userId",id)
      }
      getUserId(){
        return localStorage.getItem("userId")
      }
      getCurrentUser(): Realm.User{
       return app.currentUser
      }
      async refreshUser(){
        const user = app.currentUser
        if(user.isLoggedIn){
         await user.refreshAccessToken()
         
        }
      }

      async logout(){
        app.currentUser.logOut()
      }
      

    //   async setUser(){
    //     if(!this.user){
    //       this.user = await this.loginUser()
    //       console.log(this.user)
    //     }
    //    }



    //    async getUser(){
    //     const userLocal = sessionStorage.getItem("user")
    //     if (userLocal){
    //         console.log(JSON.parse(userLocal))
    //         return JSON.parse(userLocal)
    //     }
    //     else{
    //         const user = await this.loginUser()
    //         if(user){
               
    //             sessionStorage.setItem("user", JSON.stringify(user))
    //             console.log(user)
    //            return user 
    //         }
    //         else{
    //            return null
    //         }
    //     } 
    //    }

    //    getLocalUser(){
    //     const userLocal = sessionStorage.getItem("user")
    //     if (userLocal){
    //         this.token = JSON.parse(userLocal)
    //     }
    //    }
  }
