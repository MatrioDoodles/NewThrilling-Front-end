import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/auth/authentication.service";
import {MenuItem} from "primeng/api";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  year:number;
  date: Date
  constructor() {
  }
  ngOnInit(): void {
    this.date = new Date();
    this.year = this.date.getFullYear()
  }

}
