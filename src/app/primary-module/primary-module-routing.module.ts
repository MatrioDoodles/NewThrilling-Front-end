import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/misc/welcome/welcome.component';
import {ListUsersComponent} from "./components/users/list-users/list-users.component";
import {AddUserComponent} from "./components/users/add-user/add-user.component";
import {RouteGuardService} from "../services/auth/route-guard.service";
import {ListProductsComponent} from "./components/products/list-products/list-products.component";
import {AddProductComponent} from "./components/products/add-product/add-product.component";
import {ListOrdersComponent} from "./components/orders/list-orders/list-orders.component";
import {MyOrdersComponent} from "./components/orders/my-orders/my-orders.component";
import {OrderComponent} from "./components/orders/order/order.component";
import {CommentsValidationsComponent} from "./components/comments-validations/comments-validations.component";
import {ContactFormsComponent} from "./components/contact-forms/contact-forms.component";
import {AdminRouteGuardService} from "../services/auth/admin-route-guard.service";


export const primaryRoutes: Routes = [

  { path: 'listUsers/:typeUsers', component: ListUsersComponent, canActivate:[RouteGuardService,AdminRouteGuardService] },
  { path: 'addUser/:typeUser/:updateElement', component: AddUserComponent, canActivate:[RouteGuardService,AdminRouteGuardService] },
  { path: 'listProducts', component: ListProductsComponent, canActivate:[RouteGuardService] },
  { path: 'addProduct/:updateElement', component: AddProductComponent, canActivate:[RouteGuardService] },
  { path: 'listOrders', component: ListOrdersComponent, canActivate:[RouteGuardService] },
  { path: 'listOrdersByConsultant', component: MyOrdersComponent, canActivate:[RouteGuardService] },
  { path: 'order', component: OrderComponent, canActivate:[RouteGuardService] },
  { path: 'welcome', component: WelcomeComponent, canActivate:[RouteGuardService,AdminRouteGuardService] },
  { path: 'comments', component: CommentsValidationsComponent, canActivate:[RouteGuardService] },
  { path: 'contacts', component: ContactFormsComponent, canActivate:[RouteGuardService] }

];

@NgModule({
  imports: [RouterModule.forChild(primaryRoutes)],
  exports: [RouterModule]
})
export class PrimaryModuleRoutingModule { }
