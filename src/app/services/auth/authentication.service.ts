import { HttpClient } from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import { API_URL } from 'src/app/app.const';
import { map } from 'rxjs/operators';
import { UserService } from '../users/user.service';


export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @Output() getLoggedIn: EventEmitter<any> = new EventEmitter();
  constructor(
    private httpClient: HttpClient,
    private userService:UserService
              ) { }

  isUserLogged(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null)
  }
  // //BasicAuth
  // LoginBasic(username,password){
  //   let header = 'Basic '+ window.btoa(username +':'+ password)

  //   let headers = new HttpHeaders({
  //     Authorization: header
  //   })
  //   return this.httpClient
  //  .get(`${API_URL}/basicauth`,{headers}).
  //         pipe(
  //               map(
  //                 data =>{
  //                   sessionStorage.setItem(AUTHENTICATED_USER,username);
  //                   sessionStorage.setItem(TOKEN,header);
  //                   return data;
  //                 }
  //               )
  //  );
  // }
  //JWTAuth
  Login(username,password){
    return this.httpClient
   .post<any>(`${API_URL}/authenticate`,{
    username,
    password
   }).
          pipe(
                map(
                  data =>{
                    sessionStorage.setItem(AUTHENTICATED_USER,username);
                    sessionStorage.setItem(TOKEN,`Bearer ${data.token}`);
                    this.getLoggedIn.emit(true);
                    this.userService.getUserByUsername(username).subscribe(
                      response => {
                        console.log(response)
                        //sessionStorage.setItem('role',response.role.label);
                        sessionStorage.setItem('user',response.name);

                      }
                    )
                    return data;
                  }
                )
   );
  }
  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
    return sessionStorage.getItem(TOKEN)
  }

  Logout()
  {
    this.getLoggedIn.emit(false);
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }
}
