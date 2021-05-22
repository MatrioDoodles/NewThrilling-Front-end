import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {PrimaryModuleComponent} from "./primary-module/primary-module.component";

export const childRoutes = [
  {
    path: 'primary-module',
    loadChildren: () => import('./primary-module/primary-module.module').then(m => m.PrimaryModuleModule)
  },
]  as Route[];

const routes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full' },
  { path: 'login',
    component: LoginComponent },
  {
    path: 'NTPModule',
    component: PrimaryModuleComponent,
    //canActivate: [RouteGuardService],
    children: childRoutes
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
