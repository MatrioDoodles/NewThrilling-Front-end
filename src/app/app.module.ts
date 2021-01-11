import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/misc/login/login.component';
import { WelcomeComponent } from './components/misc/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/auth/http-interceptor.service';
import { FooterComponent } from './components/misc/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/misc/header/header.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { ListOrdersComponent } from './components/orders/list-orders/list-orders.component';
import { OrderComponent } from './components/orders/order/order.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MyOrdersComponent } from './components/orders/my-orders/my-orders.component';
import { ListeLivreurComponent } from './components/orders/liste-livreur/liste-livreur.component';
import { ConfirmAnnulationComponent } from './components/misc/confirm-annulation/confirm-annulation.component';
import { DialogCalendarComponent } from './components/misc/dialog-calendar/dialog-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
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
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ListeLivreurComponent,ConfirmAnnulationComponent]
})
export class AppModule { }
