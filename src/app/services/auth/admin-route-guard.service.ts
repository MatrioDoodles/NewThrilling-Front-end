import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AdminRouteGuardService implements CanActivate {

  constructor(private Auth:AuthenticationService,
              private location: Location) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)

  {
    if(sessionStorage.getItem('role')==='ADMINISTRATEUR')
  {
    return true;
  }
  else
      alert("Vous n'avez pas les droits nécessaire pour acceder a cette page");
    this.location.back();
    return false;
  }
}
