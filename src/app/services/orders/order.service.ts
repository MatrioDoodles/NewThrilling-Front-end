import { Injectable } from '@angular/core';
import { User } from '../users/user.service';
import { Invoice } from '../invoices/invoice.service';
import { Product } from '../products/product.service';
import { API_URL } from 'src/app/app.const';
import { HttpClient } from '@angular/common/http';

export class Order{
  constructor(
    public id:number,
    public description:string,
    public paid:boolean,
    public matricule:string,
    public shipped:boolean,
    public aborted:boolean,
    public creation_date:Date,
    public shipping_date:Date,
    public pay_date:Date,
    public tenantid:number,
    public user:User,
    public invoice:Invoice,
    public products:Product[]
  ){}
}
export const ENTITY_URL = 'orders'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getAllOrders(){
    if(sessionStorage.getItem('role')=== "SUPER_ADMIN" )
    return this.httpClient
   .get<Order[]>(`${API_URL}/${ENTITY_URL}/GetAllOrders`);
   else
   return this.httpClient
   .get<Order[]>(`${API_URL}/${ENTITY_URL}/GetAllOrdersT/${sessionStorage.getItem('tenantId')}`);
  }

  getOrderById(Orderid){
    return this.httpClient
   .get<Order>(`${API_URL}/${ENTITY_URL}/${Orderid}`);
  }

  // getOrderByTenantId(tenantId){
  //   return this.httpClient
  //  .get<Order>(`${API_URL}/${ENTITY_URL}/GetAllOrdersT/${tenantId}`);
  // }

  UpdateOrderBYid(Order){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModOrder`,Order);
  }

  AddOrder(Order){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addOrder`,Order);
  }
  GetOrdersByClient(client){
    return this.httpClient
 .get<Order[]>(`${API_URL}/${ENTITY_URL}/GetOrdersByClient/${client.id}`);
  }

  deleteOrderById(Orderid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelOrder/${Orderid}`);
  }
}
