import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, from, throwError } from "rxjs";
import { AuthAltasService } from "../service/auth-atlas.service";
import { Router } from "@angular/router";


// @Injectable()
// export class AuthenticationInterceptor implements HttpInterceptor {
//   constructor(
   
//    private auth: AuthAltasService,
    
//     private router: Router
//   ) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     try {
//     if(!this.auth.getToken()){
//         this.auth.token.subscribe((t) => {
//           if(t){
//             request = request.clone({
//                 setHeaders: {
//                   Authorization: 'Bearer ' + t,
//                 },
//               });
//           }
//         })
      
//       }
//     }catch (exception) {}


//     // return next.handle(request);
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error?.status == 401) {
//           return this.refreshTokenMethod(request, next, loginResponseModel);
//         } else {
//           return throwError(() => error);
//         }
//       })
//     );
//   }



//   async refreshTokenMethod(
//     request: HttpRequest<any>,
//     next: HttpHandler,
   
//   ){
//     await this.auth.refreshToken()
//     console.log(this.headerRequestService.addHeader(request))
//     return next.handle(this.headerRequestService.addHeader(request));
//   }


//   redirectLogout() {
//     this.signupService.clearLoginResponse();
//     this.router.navigateByUrl('/', { skipLocationChange: true }).then(
//       () => {
//         this.router.navigate(['current-opening']);
//       },
//       catchError((error) => {
//         return throwError(() => error);
//       })
//     );
//   }
// }