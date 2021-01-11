import { Component, OnInit } from '@angular/core';
import { faUsers,faTruck,faShoppingCart,faShoppingBasket,faBox } from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/auth/authentication.service";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faUsers = faUsers;
  faTruck = faTruck;
  faShoppingCart = faShoppingCart;
  faShoppingBasket = faShoppingBasket;
  faBox = faBox;
  connected =false;
  role;
  Admin;

  constructor(private authService:AuthenticationService) {
      authService.getLoggedIn.subscribe(status => {
        this.connected = status;
      })
    authService.role$.subscribe(
      response => {
        this.Admin=response;
      }
    );


  }

  ngOnInit(): void {
    this.role=sessionStorage.getItem('role');
    if(this.role === 'ADMINISTRATEUR')
      this.Admin=true;
    else
      this.Admin=false;
    if(sessionStorage.getItem('token')!=null)
      this.connected = true;
    else
      this.connected = false;
  }

}
