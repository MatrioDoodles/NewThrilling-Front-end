import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.const';
import { User } from '../users/user.service';

export class Product{
  constructor(
    public id:number,
    public label:string,
    public reference:string,
    public selling_price_HT:number,
    public buying_price_HT:number,
    public picture:string,
    public expiring_date:Date,
    public perishable:boolean,
    public amount:number,
    public supply_amount:number,
    public user:User

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

  getProductsByTenantId(tenantId){
    return this.httpClient
   .get<Product[]>(`${API_URL}/${ENTITY_URL}/GetAllProductsT/${tenantId}`);
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
  GetProductsByWarehouse(warehouse){
    return this.httpClient
 .get<Product[]>(`${API_URL}/${ENTITY_URL}/GetProductsByWarehouse/${warehouse.id}`);
  }
  GetProductsBySupplier(supplier){
    return this.httpClient
 .get<Product[]>(`${API_URL}/${ENTITY_URL}/GetProductsBySupplier/${supplier.id}`);
  }
  GetProductsByCategory(category){
    return this.httpClient
 .get<Product[]>(`${API_URL}/${ENTITY_URL}/GetProductsByCategory/${category.id}`);
  }

  deleteProductById(Productid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelProduct/${Productid}`);
  }
  upload(pic:File){
    return this.httpClient
   .post(`${API_URL}/${ENTITY_URL}/upload`,pic);
  }

  getImg(Supplierid){
    return this.httpClient
    .get<File>(`${API_URL}/${ENTITY_URL}/img/${Supplierid}`);
  }
}
