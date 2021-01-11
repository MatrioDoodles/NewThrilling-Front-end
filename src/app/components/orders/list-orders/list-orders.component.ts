import {Component, OnInit, ViewChild} from '@angular/core';
import {API_URL} from "../../../app.const";
import {ActivatedRoute, Router} from "@angular/router";
import {Order, OrderProduct, OrderService} from "../../../services/orders/order.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UserService,User} from "../../../services/users/user.service";
import * as _ from 'underscore';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmAnnulationComponent} from "../../misc/confirm-annulation/confirm-annulation.component";


@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  displayedColumns: string[] = ['matricule','status','ville','client','num','adresse','produits', 'total','actions'];
  Orders:MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Ordersdat:Order[];
  SortedOrders:Order[];
  OrderType;
  btnname:string;

  constructor(private OrderService:OrderService,
              private route:Router,
              private UserService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.RetrieveAllOrders();
  }

  applyFilterClient(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.Orders.filter = filterValue
  }

  RetrieveAllOrders(){
    this.OrderService.getAllOrdersNotAssigned().
    subscribe(
      (data: any) => {
        this.Ordersdat = data

        for(let i=0;i<this.Ordersdat.length;i++)
        {

          this.Ordersdat[i].products =[] ;
          this.OrderService.getOrderproducts( this.Ordersdat[i].id).subscribe(
            (response:OrderProduct[]) => {
              setTimeout(() => {
              for (let j = 0; j < this.Ordersdat.length; j++) {
                this.Ordersdat[i].products.push(response[j].product);
                this.Ordersdat[i].products[j].qteOrdered=response[j].quantity;

              }})
            }
          )

        }
        //this.Orders = new MatTableDataSource(data);
        setTimeout(() => {
          this.SortedOrders = _.sortBy(this.Ordersdat,'status');
          this.Ordersdat = this.SortedOrders.reverse();
          this.Orders = new MatTableDataSource(this.Ordersdat);
          this.Orders.paginator = this.paginator;
          this.Orders.sort = this.sort; });
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
          this.OrderService.UpdateOrderBYid(SelectedOrder).subscribe(
            response => this.RetrieveAllOrders()
          );
        }
      }
    );

  }


}
