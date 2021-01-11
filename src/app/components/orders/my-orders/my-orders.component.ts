import {Component, OnInit, ViewChild} from '@angular/core';
import {Order, OrderProduct, OrderService} from "../../../services/orders/order.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {User, UserService} from "../../../services/users/user.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import * as _ from 'underscore';
import {ListeLivreurComponent} from "../liste-livreur/liste-livreur.component";
import {ConfirmAnnulationComponent} from "../../misc/confirm-annulation/confirm-annulation.component";
import {DialogCalendarComponent} from "../../misc/dialog-calendar/dialog-calendar.component";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  displayedColumns: string[] = ['matricule','status','ville','client','num','adresse','produits', 'total','actions'];
  Orders:MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Ordersdat:Order[];
  SortedOrders:Order[];
  Selectedlivreur:User;
  btnname:string;

  constructor(private OrderService:OrderService,
              private route:Router,
              private UserService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
   // this.RetrieveAllLivreur();
    this.RetrieveAllOrders();
  }

  applyFilterClient(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.Orders.filter = filterValue
  }
  /*RetrieveAllLivreur(){
    this.UserService.getUserByRoleLivreur().subscribe(
      (response:User[]) =>{
        setTimeout(()=>{
          this.livreurs = response;
        })
      }
    )
  }*/

  RetrieveAllOrders(){
    this.OrderService.getOrderByConsultant(sessionStorage.getItem('authenticatedUser')).
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
          console.log(this.Ordersdat)
          this.Orders.paginator = this.paginator;
          this.Orders.sort = this.sort; });
      }
    )}
  Confirmer(SelectedOrder:Order){
    SelectedOrder.status = "Double Confirmé"
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
  AssignerLivreur(SelectedOrder:Order){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data ={
      city:SelectedOrder.city
    }
    const dialogRef = this.dialog.open(ListeLivreurComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.Selectedlivreur = data
        if(this.Selectedlivreur != null && this.Selectedlivreur != undefined) {
          SelectedOrder.status = "En cours de livraison"

          this.UserService.getUserByUsername(sessionStorage.getItem('authenticatedUser')).subscribe(
            (response: User) => (
              setTimeout(() => {
                SelectedOrder.consultant = response
                this.OrderService.UpdateOrderBYid(SelectedOrder).subscribe(
                  response => this.RetrieveAllOrders()
                );
              }))
          )
        }
      }

    );


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
  Livre(SelectedOrder:Order){
    SelectedOrder.status = "Livré"
    this.OrderService.UpdateOrderBYid(SelectedOrder).subscribe(
      response => this.RetrieveAllOrders()
    );
  }
  reporter(SelectedOrder:Order){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DialogCalendarComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
    SelectedOrder.status = "Reporté"
    SelectedOrder.Shipping_date = data ;
    this.OrderService.UpdateOrderBYid(SelectedOrder).subscribe(
      response => this.RetrieveAllOrders()
    );
      }
    )
  }

}
