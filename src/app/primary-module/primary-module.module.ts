import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimaryModuleRoutingModule} from "./primary-module-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {ListboxModule} from "primeng/listbox";
import {DropdownModule} from "primeng/dropdown";
import {MatSortModule} from "@angular/material/sort";
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {WelcomeComponent} from "./components/misc/welcome/welcome.component";
import {FooterComponent} from "./components/misc/footer/footer.component";
import {HeaderComponent} from "./components/misc/header/header.component";
import {ListUsersComponent} from "./components/users/list-users/list-users.component";
import {AddUserComponent} from "./components/users/add-user/add-user.component";
import {AddProductComponent} from "./components/products/add-product/add-product.component";
import {ListProductsComponent} from "./components/products/list-products/list-products.component";
import {ListOrdersComponent} from "./components/orders/list-orders/list-orders.component";
import {OrderComponent} from "./components/orders/order/order.component";
import {MyOrdersComponent} from "./components/orders/my-orders/my-orders.component";
import {ListeLivreurComponent} from "./components/orders/liste-livreur/liste-livreur.component";
import {ConfirmAnnulationComponent} from "./components/misc/confirm-annulation/confirm-annulation.component";
import {DialogCalendarComponent} from "./components/misc/dialog-calendar/dialog-calendar.component";
import {CommentsValidationsComponent} from "./components/comments-validations/comments-validations.component";
import {ContactFormsComponent} from "./components/contact-forms/contact-forms.component";
import {PrimaryModuleComponent} from "./primary-module.component";




@NgModule({
  declarations: [
    WelcomeComponent,
    FooterComponent,
    HeaderComponent,
    ListUsersComponent,
    AddUserComponent,
    AddProductComponent,
    ListProductsComponent,
    ListOrdersComponent,
    OrderComponent,
    MyOrdersComponent,
    ListeLivreurComponent,
    ConfirmAnnulationComponent,
    DialogCalendarComponent,
    CommentsValidationsComponent,
    ContactFormsComponent,
    PrimaryModuleComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    PrimaryModuleRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CommonModule,
    MatExpansionModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ListboxModule,
    DropdownModule,
    MatSortModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    TableModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [PrimaryModuleComponent],
  entryComponents: [ListeLivreurComponent,ConfirmAnnulationComponent]
})
export class PrimaryModuleModule { }
