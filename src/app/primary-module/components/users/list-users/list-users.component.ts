import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User, UserService} from "../../../../services/users/user.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {


  users:User[];
  userType;
  btnname:string;
  loading: boolean = true;
  userTypeString;

  constructor(private UserService:UserService,
              private route:Router,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    const queryParams = this.router.snapshot.queryParams
    const routeParams = this.router.snapshot.params;
    this.userType =routeParams.typeUsers
    this.router.queryParams.subscribe(queryParams => {
      // do something with the query params
    });
    this.router.params.subscribe(routeParams => {
      this.RetrieveAllUsers(routeParams.typeUsers);

    });
    this.loading = false;
  }



  RetrieveAllUsers(userType){
    if(userType === '1'){
      this.userType = userType;
      this.btnname = "Ajouter Un Administrateur"
      this.userTypeString ="Administrateurs"
    this.UserService.getAllUsers().
    subscribe(
      (data: any) => {
        this.users = data
      }
    )}
    else if(userType === '2'){
      this.userType = userType;
      this.btnname = "Ajouter Un Consultant"
      this.userTypeString ="Consultants"
      this.UserService.getUserByRoleConsultant().
      subscribe(
        (data: any) => {
          this.users = data
        }
      )}
    else if(userType === '3'){
      this.userType = userType;
      this.btnname = "Ajouter Un Livreur"
      this.userTypeString ="Livreurs"
      this.UserService.getUserByRoleLivreur().
      subscribe(
        (data: any) => {
          this.users = data

        }
      )}
  }
  Modifier(SelectedUser:User){
    this.route.navigate(['NTPModule/primary-module/addUser',this.userType,SelectedUser.id])
  }
  Supprimer(SelectedUser){
    this.UserService.deleteUserById(SelectedUser).
    subscribe(
      response => this.RetrieveAllUsers(this.userType)
    );
  }
}
