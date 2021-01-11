import { Injectable } from '@angular/core';
import { Product } from '../products/product.service';
import { API_URL } from 'src/app/app.const';
import { HttpClient } from '@angular/common/http';
import {User} from "../users/user.service";

export class Order{
  constructor(
    public id:number,
    public description:string,
    public paid:boolean,
    public status:string,
    public city:string,
    public client_name:string,
    public client_mail:string,
    public client_tel:string,
    public client_adress:string,
    public payment_status:string,
    public total:number,
    public shipping_cost:number,
    public total_to_pay:number,
    public matricule:string,
    public shipped:boolean,
    public aborted:boolean,
    public orde_date:Date,
    public Shipping_date:Date,
    public OrderProduct:OrderProduct[],
    public products:Product[],
    public livreur:User,
    public consultant:User,
  ){}
}
export class OrderProduct {
  constructor(
    public id:number,
    public product:Product,
    public order:Order,
    public quantity:number,
  ){}


}
export class ProductsWithQTE {
  constructor(
    public quantity:number,
    public product:Product,
  ) {
  }

}
export const ENTITY_URL = 'orders'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getAllOrders(){
    return this.httpClient
      .get<Order[]>(`${API_URL}/${ENTITY_URL}/GetAllOrders`);

  }
  getAllOrdersNotAssigned(){
    return this.httpClient
      .get<Order[]>(`${API_URL}/${ENTITY_URL}/GetOrderByConsultantNull`);

  }
  getOrderById(Orderid){
    return this.httpClient
      .get<Order>(`${API_URL}/${ENTITY_URL}/${Orderid}`);
  }
  getOrderByConsultant(consultantId){
    return this.httpClient
      .get<Order>(`${API_URL}/${ENTITY_URL}/GetOrderByConsultant/${consultantId}`);
  }
  getOrderByLivreur(LivreurId){
    return this.httpClient
      .get<Order>(`${API_URL}/${ENTITY_URL}/GetOrderByLivreur/${LivreurId}`);
  }

  UpdateOrderBYid(Order){
    return this.httpClient
      .put(`${API_URL}/${ENTITY_URL}/ModOrder`,Order);
  }

  AddOrder(Order){
    return this.httpClient
      .post(`${API_URL}/${ENTITY_URL}/addOrder`,Order);
  }
  order(OrderProduct){
    return this.httpClient
      .post(`${API_URL}/${ENTITY_URL}/order`,OrderProduct);
  }
  getOrderproducts(OrderId)
  {
    return this.httpClient
      .get<OrderProduct[]>(`${API_URL}/${ENTITY_URL}/GetProductsOfOrder/${OrderId}`);
  }

  deleteOrderById(Orderid){
    return this.httpClient
      .delete(`${API_URL}/${ENTITY_URL}/DelOrder/${Orderid}`);
  }
}
