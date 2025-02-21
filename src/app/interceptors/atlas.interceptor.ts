import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthAltasService } from "../service/auth-atlas.service";
import { mongoAtlas } from "src/environments/environment";


@Injectable()
export class AtlasInterceptor implements HttpInterceptor {
  token: string
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private auth: AuthAltasService){
    
  }
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if(this.token){
    req = req.clone({
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          //"Authorization":` Bearer ${this.token}`,
  
      })
    });
    
  }

  //console.log('Intercepted HTTP call', authReq);

  return next.handle(req);
}
}