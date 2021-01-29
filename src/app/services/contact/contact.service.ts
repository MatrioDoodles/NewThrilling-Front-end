import { Injectable } from '@angular/core';
import {Product} from "../products/product.service";
import {HttpClient} from "@angular/common/http";



export class ContactForm {
  constructor(
    public id:number,
    public requestTitle:string,
    public description:string,
    public subject:string,
    public status:string,
    public name:string,
    public mail:string,
  ) {
  }
}

export const ENTITY_URL = 'contact'
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

}
