import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Order, OrderProduct, OrderService} from "../../../../services/orders/order.service";
import {Product, ProductService} from "../../../../services/products/product.service";
import {ListboxModule} from 'primeng/listbox';
import {Router} from "@angular/router";
import {User, UserService} from "../../../../services/users/user.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
order:Order;
products:Product[];
selectedProduct:Product;
SelectedProducts:Product[]=[];
selectedProductD:Product;
selectedQTE;
uniqueProduct:boolean;
multiProducts:boolean;
noProduct:boolean;
update1:boolean;
update2:boolean;
CurrentUser:User;
OrdertoSend:OrderProduct[]=[];
  constructor(private productService:ProductService,
              private orderService:OrderService,
              private route:Router,
              private userService:UserService,
              private cd : ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.uniqueProduct=false;
    this.multiProducts=false;
    this.noProduct=true;
    this.update1=false;
    this.update2=true;
    var today = new Date();
    this.order = new Order(null,'',null,'Confirmé','','','',
      '','','Pas encore payé',null,null,
      null,'',false,
      false,null,today,null,
      null,null,null);
    this.productService.getAllProducts().subscribe(
      (response:Product[]) => {
        setTimeout(()=> {
          this.products=response;
        })
      }
    )
    this.userService.getUserByUsername(sessionStorage.getItem('authenticatedUser')).subscribe(
      (response:User)=>{
        this.CurrentUser=response;
      }
    )

  }
  addToCart(){
    if(this.SelectedProducts.length === 1)
    {
      this.selectedProductD=this.selectedProduct;
      this.uniqueProduct=true;
      this.multiProducts=false;
      this.noProduct=false;
    }
    else if(this.SelectedProducts.length > 1) {
      this.uniqueProduct=false;
      this.multiProducts=true;
      this.noProduct=false;


    }

    var newARR = this.SelectedProducts;
    if(!newARR.includes(this.selectedProduct)) {
      newARR.push(this.selectedProduct);
      this.SelectedProducts = newARR;
      this.OrdertoSend.push(new OrderProduct(null, this.selectedProduct, null, this.selectedQTE));
    }
    else{
      this.OrdertoSend[this.OrdertoSend.findIndex(p=>p.product === this.selectedProduct)].quantity =
        this.OrdertoSend[this.OrdertoSend.findIndex(p=>p.product === this.selectedProduct)].quantity + this.selectedQTE;
    }

    if(this.SelectedProducts.length === 1)
    {
      this.selectedProductD=this.selectedProduct;
      this.uniqueProduct=true;
      this.multiProducts=false;
      this.noProduct=false;
    }
    else if(this.SelectedProducts.length > 1) {
      this.uniqueProduct=false;
      this.multiProducts=true;
      this.noProduct=false;
      if(this.update2)
      {
        this.update2=false;
        this.update1=true;
        return null;
      }
      else if(this.update1)
      {
        this.update1=false;
        this.update2=true;
      }
    }
  }
  /*onChangeproduct(prod){
   this.selectedProductD = prod.selectedOption;
  }*/
  delFromCart(){
    console.log(this.SelectedProducts)
    if(this.SelectedProducts.length === 1)
    {
      this.selectedProductD=this.selectedProduct;
      this.uniqueProduct=true;
      this.multiProducts=false;
      this.noProduct=false;
    }
    else if(this.SelectedProducts.length > 1) {
      this.uniqueProduct=false;
      this.multiProducts=true;
      this.noProduct=false;
    }
    else if(this.SelectedProducts.length ===0) {
      this.uniqueProduct=false;
      this.multiProducts=false;
      this.noProduct=true;
    }
    let newArray = this.SelectedProducts.filter((el:Product)=> {
      return el !== this.selectedProductD;
    });
    this.SelectedProducts = newArray;
    for(let i=0;i<this.OrdertoSend.length;i++)
    {
      if(this.OrdertoSend[i].product === this.selectedProductD)
      { let order = this.OrdertoSend[i];
        let newArr = this.OrdertoSend.filter((el:OrderProduct) => {
          return el !== order;
        })
        this.OrdertoSend = newArr;
      }

    }
    if(this.SelectedProducts.length === 1)
    {
      this.selectedProductD=this.selectedProduct;
      this.uniqueProduct=true;
      this.multiProducts=false;
      this.noProduct=false;
    }
    else if(this.SelectedProducts.length > 1) {
      this.uniqueProduct=false;
      this.multiProducts=true;
      this.noProduct=false;
      if(this.update2)
      {
        this.update2=false;
        this.update1=true;
        return null;
      }
      else if(this.update1)
      {
        this.update1=false;
        this.update2=true;
      }

    } else if(this.SelectedProducts.length ===0){
      this.uniqueProduct=false;
      this.multiProducts=false;
      this.noProduct=true;
    }
    console.log(this.SelectedProducts)
  }

  logSel()
  {
    console.log(this.selectedProductD);
  }
  submit(){

    this.order.consultant=this.CurrentUser;
    this.order.total=0;
    for(let i=0;i<this.OrdertoSend.length;i++)
    {
       this.order.total = this.order.total + (this.OrdertoSend[i].product.selling_price_HT * this.OrdertoSend[i].quantity);
    }
    this.order.total_to_pay = this.order.total;
    this.orderService.AddOrder(this.order).subscribe(
      (response:Order)=>{
        setTimeout(()=>{
          for(let i=0;i<this.OrdertoSend.length;i++)
          {
            this.OrdertoSend[i].order = response;
          }
          this.orderService.order(this.OrdertoSend).subscribe(
            (response)=>{
              this.route.navigate(['listOrdersByConsultant']);
            }
          )
        })
      }
    )


  }
}
