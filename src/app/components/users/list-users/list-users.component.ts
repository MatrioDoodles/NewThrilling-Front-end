import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User, UserService} from "../../../services/users/user.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  displayedColumns: string[] = ['name','surname','mail', 'phone', 'adress','username','role','ville','actions'];
  users:MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  usersdat:User[];
  userType;
  btnname:string;

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
  }

  applyFilterClient(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.users.filter = filterValue
  }

  RetrieveAllUsers(userType){
    if(userType === '1'){
      this.btnname = "Ajouter Un Administrateur"
    this.UserService.getAllUsers().
    subscribe(
      (data: any) => {
        this.usersdat = data
        //this.Users = new MatTableDataSource(data);
        setTimeout(() => {
          this.users = new MatTableDataSource(data);
          this.users.paginator = this.paginator;
          this.users.sort = this.sort; });
      }
    )}
    else if(userType === '2'){
      this.btnname = "Ajouter Un Consultant"
      this.UserService.getUserByRoleConsultant().
      subscribe(
        (data: any) => {
          this.usersdat = data
          //this.Users = new MatTableDataSource(data);
          setTimeout(() => {
            this.users = new MatTableDataSource(data);
            this.users.paginator = this.paginator;
            this.users.sort = this.sort; });
        }
      )}
    else if(userType === '3'){
      this.btnname = "Ajouter Un Livreur"
      this.UserService.getUserByRoleLivreur().
      subscribe(
        (data: any) => {
          this.usersdat = data
          //this.Users = new MatTableDataSource(data);
          setTimeout(() => {
            this.users = new MatTableDataSource(data);
            this.users.paginator = this.paginator;
            this.users.sort = this.sort; });
        }
      )}
  }
  Modifier(SelectedUser:User){
    this.route.navigate(['addUser',this.userType,SelectedUser.id])
  }
  Supprimer(SelectedUser){
    this.UserService.deleteUserById(SelectedUser).
    subscribe(
      response => this.RetrieveAllUsers(this.userType)
    );
  }
}
