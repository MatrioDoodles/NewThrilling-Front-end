import { Injectable } from '@angular/core';
import { Product } from '../products/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../app.const';
import { AuthenticationService } from '../auth/authentication.service';

export class Category{
  constructor(
  public id:number,
  public label:string,
  public description:string,
  public products:Product[]
  ){}
}
export const ENTITY_URL = 'categories'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
              private httpClient: HttpClient,
              private authService:AuthenticationService
              ) { }

  getAllCategories(){
    return this.httpClient
   .get<Category[]>(`${API_URL}/${ENTITY_URL}/GetAllCategorys`);
  }

  getCategorieById(Catid){
    return this.httpClient
   .get<Category>(`${API_URL}/${ENTITY_URL}/${Catid}`);
  }
  UpdateCategorieBYid(category){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModCategory`,category);
  }
  AddCategorie(category){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addCategory`,category);
  }

  deleteCategorieById(Catid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelCategory/${Catid}`);
  }
}
