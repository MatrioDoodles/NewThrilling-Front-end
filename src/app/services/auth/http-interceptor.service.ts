import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private AuthService:AuthenticationService
    ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler){

    let header = this.AuthService.getAuthenticatedToken()
    let username = this.AuthService.getAuthenticatedUser()

    if(header && username){
    req = req.clone({
      setHeaders : {
        Authorization : header
      }
    })
  }
    return next.handle(req)
  }
}
