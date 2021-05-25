import { Component, OnInit } from '@angular/core';
import {Role, User, UserService} from "../../../../services/users/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {startWith,map} from "rxjs/operators";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  User: User
  Userresp:User
  roleuser:Role;
  userType;
  typeUser:string;
  btnname: string
  villes: string[] =  [
    'AGADIR', 'BENI MELLAL', 'BERKANE', 'CASABLANCA', 'ELJADIDA', 'FES', 'INEZGANE', 'KENITRA', 'KHEMISSET', 'KHENIFRA',
    'SETTAT', 'KHOURIBGA', 'LAAYOUNE', 'MARRAKECH', 'MEKNES', 'MOHAMMADIA', 'NADOR', 'OUJDA', 'RABAT', 'SAFI', 'SALE',
    'SIDI KACEM', 'TANGER', 'TAZA', 'TEMARA', 'TETOUAN', 'AL HOCEIMA', 'BERRECHID', 'ERRACHIDIA', 'ESSAOUIRA', 'OUARZAZATE',
    'OUEZZANE', 'SEFROU', 'TIFLET'
  ];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  constructor(private route: ActivatedRoute,
              private UserService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.UserService.getAllRoles().subscribe(
      response => {
        setTimeout(()=>{
          console.log(response)
          if(this.userType === '1') {
            this.roleuser = response[0];
          }
          else if(this.userType === '2') {
            this.roleuser = response[1];
          }
          else if(this.userType === '3') {
            this.roleuser = response[2];
          }
        })
        console.log(this.roleuser)
      }
    )
    this.userType =this.route.snapshot.params['typeUser'];
    if(this.userType === '1') {
      this.typeUser = "Administrateur";
    }
    else if(this.userType === '2') {
      this.typeUser = "Consultant";
    }
    else if(this.userType === '3') {
      this.typeUser = "Livreur";
    }

    if (this.route.snapshot.params['updateElement'] === '0') {
      this.User = new User(null, '','', '',
        '', '', '','','','',this.roleuser)
      this.btnname = "Ajouter"
    }

    else {
      this.UserService.getUserById(this.route.snapshot.params['updateElement']).
      subscribe(
        (data: any) => {
          this.User = data;
        }
      )
      this.btnname = "Modifier"
    }

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.villes.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  submit() {
    if (this.route.snapshot.params['updateElement'] === "0") {
      this.User.role = this.roleuser;
      this.UserService.AddUser(this.User).subscribe(
        (resp:User) => {
          this.Userresp=resp
          this.router.navigate(['NTPModule/primary-module/listUsers/'+this.userType])}
      );

    }
    else {
      this.UserService.UpdateUserBYid(this.User).subscribe(
        (resp:User) => {this.Userresp=resp}
      )
      this.router.navigate(['NTPModule/primary-module/listUsers/'+this.userType]);
    }

  }
}
