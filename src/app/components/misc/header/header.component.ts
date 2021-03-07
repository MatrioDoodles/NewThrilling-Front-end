import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/auth/authentication.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  connected :boolean;
  user;
  constructor(private authService:AuthenticationService,
              private route:Router) {
  authService.getLoggedIn.subscribe(status => this.connected =status)
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')!=null)
      this.connected = true;
    else
      this.connected = false;
    this.user = sessionStorage.getItem('authenticatedUser');
  }
 logout()
 {
   this.authService.Logout();
   this.route.navigate(['login']);


 }
}
