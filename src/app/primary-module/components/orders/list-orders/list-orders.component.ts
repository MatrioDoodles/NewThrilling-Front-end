import {Component, OnInit, ViewChild} from '@angular/core';
import {API_URL} from "../../../../app.const";
import {ActivatedRoute, Router} from "@angular/router";
import {Order, OrderProduct, OrderService} from "../../../../services/orders/order.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UserService,User} from "../../../../services/users/user.service";
import * as _ from 'underscore';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmAnnulationComponent} from "../../misc/confirm-annulation/confirm-annulation.component";


@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  Orders:Order[];
  SortedOrders:Order[];
  OrderType;
  loading: boolean = true;
  btnname:string;

  constructor(private OrderService:OrderService,
              private route:Router,
              private UserService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.RetrieveAllOrders();
    this.loading = false;
  }



  RetrieveAllOrders(){
    this.OrderService.getAllOrdersNotAssigned().
    subscribe(
      (data: any) => {
        this.Orders = data

        for(let i=0;i<this.Orders.length;i++)
        {

          this.Orders[i].products =[] ;
          this.OrderService.getOrderproducts( this.Orders[i].id).subscribe(
            (response:OrderProduct[]) => {
              setTimeout(() => {
              for (let j = 0; j < this.Orders.length; j++) {
                if(!(this.Orders[i].products.find(e => e.id === response[j].product.id))) {
                  this.Orders[i].products.push(response[j].product);
                  this.Orders[i].products[j].qteOrdered = response[j].quantity;
                }
              }
                })
            }
          )

        }
        this.SortedOrders = this.Orders.sort((a, b) => (a.orde_date > b.orde_date ? -1 : 1));
      }
    )}
  Confirmer(SelectedOrder:Order){
    SelectedOrder.status = "Confirmé"
    this.UserService.getUserByUsername(sessionStorage.getItem('authenticatedUser')).subscribe(
      (response:User) =>(
      setTimeout(()=>{
        SelectedOrder.consultant = response
        this.OrderService.UpdateOrderBYid(SelectedOrder).
        subscribe(
          response => this.RetrieveAllOrders()
        );
      }))
    )


  }
  Annuler(SelectedOrder:Order){
    let choice;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data ={
      msg:"Etes vous sure de vouloir supprimer la commande " + SelectedOrder.matricule
    }
    const dialogRef = this.dialog.open(ConfirmAnnulationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        choice = data
        if(choice != null && choice != undefined) {
          SelectedOrder.status = "Annulé"
          SelectedOrder.aborted = true
          this.OrderService.UpdateOrderBYid(SelectedOrder).subscribe(
            response => this.RetrieveAllOrders()
          );
        }
      }
    );

  }


}
