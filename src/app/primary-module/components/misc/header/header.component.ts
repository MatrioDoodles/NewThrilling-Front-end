import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../../services/auth/authentication.service";
import { Router} from "@angular/router";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  connected :boolean;
  user;
  items: MenuItem[];
  role;
  Admin;

  constructor(private authService:AuthenticationService,
              private route:Router) {
    this.role=sessionStorage.getItem('role');
    if(this.role === 'ADMINISTRATEUR') {
      this.items = [
        {
          label: "Dashboard",
          icon: 'pi pi-fw pi-microsoft',
          routerLink: "/NTPModule/primary-module/welcome",
        },
        {
          label: "Utilisateurs",
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: "Administrateur",
              icon: 'pi pi-fw pi-user',
              items: [
                {
                  label: "Liste des Administrateur ",
                  icon: 'pi pi-fw pi-info-circle',
                  routerLink: "/NTPModule/primary-module/listUsers/1",
                },

                {

                  label: 'Ajouter un Administrateur',
                  icon: 'pi pi-fw pi-plus',
                  routerLink: "/NTPModule/primary-module/addUser/1/0",
                },

              ]
            },
            {
              label: "Consultants",
              icon: 'pi pi-fw pi-users',
              items: [
                {
                  label: "Liste des Consultants ",
                  icon: 'pi pi-fw pi-info-circle',
                  routerLink: "/NTPModule/primary-module/listUsers/2",
                },

                {

                  label: 'Ajouter un Consultant',
                  icon: 'pi pi-fw pi-plus',
                  routerLink: "/NTPModule/primary-module/addUser/2/0",
                },

              ]
            },
            {
              label: "Livreur",
              icon: 'pi pi-fw pi-send',
              items: [
                {
                  label: "Liste des Livreurs ",
                  icon: 'pi pi-fw pi-info-circle',
                  routerLink: "/NTPModule/primary-module/listUsers/3",
                },

                {

                  label: 'Ajouter un Livreur',
                  icon: 'pi pi-fw pi-plus',
                  routerLink: "/NTPModule/primary-module/addUser/3/0",
                },

              ]
            },
          ]
        },

        {
          label: "Commandes",
          icon: 'pi pi-fw pi-shopping-cart',
          items: [

            {
              label: "Commandes",
              icon: 'pi pi-fw pi-shopping-cart',
              items: [
                {
                  label: "Liste des Commandes ",
                  icon: 'pi pi-fw pi-info-circle',
                  routerLink: "/NTPModule/primary-module/listOrders",
                },

                {

                  label: 'Ajouter une Commande',
                  icon: 'pi pi-fw pi-plus',
                  routerLink: "/NTPModule/primary-module/order",
                },

              ],

            },
            {
              label: "Mes Commandes",
              icon: 'pi pi-fw pi-home',
              routerLink: "/NTPModule/primary-module/listOrdersByConsultant",
            },],

        },


        {

          label: "Produits",
          icon: 'pi pi-fw pi-amazon',

          items: [
            {
              label: "Liste des Produits ",
              icon: 'pi pi-fw pi-info-circle',
              routerLink: "/NTPModule/primary-module/listProducts",
            },

            {
              label: 'Ajouter un Produit',
              icon: 'pi pi-fw pi-plus',
              routerLink: "/NTPModule/primary-module/addProduct/0",
            }
          ]
        },


        {
          label: "Commentaires",
          icon: 'pi pi-fw pi-comments',
          routerLink: "/NTPModule/primary-module/comments",
        },

        {
          label: "Requetes de contact",
          icon: 'pi pi-fw pi-inbox',
          routerLink: "/NTPModule/primary-module/contacts",
        },

      ];
    }
    else {
      this.items = [
        {
          label: "Commandes",
          icon: 'pi pi-fw pi-shopping-cart',
          items: [

            {
              label: "Commandes",
              icon: 'pi pi-fw pi-shopping-cart',
              items: [
                {
                  label: "Liste des Commandes ",
                  icon: 'pi pi-fw pi-info-circle',
                  routerLink: "/NTPModule/primary-module/listOrders",
                },

                {

                  label: 'Ajouter une Commande',
                  icon: 'pi pi-fw pi-plus',
                  routerLink: "/NTPModule/primary-module/order",
                },

              ],

            },
            {
              label: "Mes Commandes",
              icon: 'pi pi-fw pi-home',
              routerLink: "/NTPModule/primary-module/listOrdersByConsultant",
            },],

        },


        {

          label: "Produits",
          icon: 'pi pi-fw pi-amazon',

          items: [
            {
              label: "Liste des Produits ",
              icon: 'pi pi-fw pi-info-circle',
              routerLink: "/NTPModule/primary-module/listProducts",
            },

            {
              label: 'Ajouter un Produit',
              icon: 'pi pi-fw pi-plus',
              routerLink: "/NTPModule/primary-module/addProduct/0",
            }
          ]
        },


        {
          label: "Commentaires",
          icon: 'pi pi-fw pi-comments',
          routerLink: "/NTPModule/primary-module/comments",
        },

        {
          label: "Requetes de contact",
          icon: 'pi pi-fw pi-inbox',
          routerLink: "/NTPModule/primary-module/contacts",
        },

      ];
    }

  }

  ngOnInit(): void {
    this.role=sessionStorage.getItem('role');
    if(this.role === 'ADMINISTRATEUR')
      this.Admin=true;
    else
      this.Admin=false;
    if(sessionStorage.getItem('token')!=null)
      this.connected = true;
    else
      this.connected = false;
  }
  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigate(['login'])
  }

}
