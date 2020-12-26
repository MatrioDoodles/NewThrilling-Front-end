import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/misc/login/login.component';
import { WelcomeComponent } from './components/misc/welcome/welcome.component';
import {ListUsersComponent} from "./components/users/list-users/list-users.component";
import {AddUserComponent} from "./components/users/add-user/add-user.component";
import {RouteGuardService} from "./services/auth/route-guard.service";


const routes: Routes = [
  //{ path: '', component: LoginComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'listUsers/:typeUsers', component: ListUsersComponent, canActivate:[RouteGuardService] },
  { path: 'addUser/:typeUser/:updateElement', component: AddUserComponent, canActivate:[RouteGuardService] },
  { path: 'welcome', component: WelcomeComponent, canActivate:[RouteGuardService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
