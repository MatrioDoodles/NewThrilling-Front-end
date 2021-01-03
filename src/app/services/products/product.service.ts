import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.const';

export class Product{
  constructor(
    public id:number,
    public label:string,
    public reference:string,
    public selling_price_HT:number,
    public producing_price_HT:number,
    public picture:string,
    public expiring_date:Date,
    public perishable:boolean,
    public amount:number,
    public supply_amount:number,
    public description:string,

  ){}
}
export const ENTITY_URL = 'products'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(){
    return this.httpClient
   .get<Product[]>(`${API_URL}/${ENTITY_URL}/GetAllProducts`);
  }

  getProductById(Productid){
    return this.httpClient
   .get<Product>(`${API_URL}/${ENTITY_URL}/${Productid}`);
  }

  UpdateProductBYid(Product){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModProduct`,Product);
  }
  AddProduct(Product){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addProduct`,Product);
  }
  deleteProductById(Productid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelProduct/${Productid}`);
  }
  upload(pic:File,id){
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("file",pic);

    return this.httpClient
      .post(`${API_URL}/${ENTITY_URL}/upload`,formData);
  }
}
