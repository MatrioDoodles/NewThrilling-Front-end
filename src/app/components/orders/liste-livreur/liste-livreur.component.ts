import {Component, Inject, OnInit} from '@angular/core';
import {User, UserService} from "../../../services/users/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-liste-livreur',
  templateUrl: './liste-livreur.component.html',
  styleUrls: ['./liste-livreur.component.scss']
})
export class ListeLivreurComponent implements OnInit {
 livreurs:User[];
 livreur:User;
 city;
  constructor(private UserService: UserService,
              private dialogRef: MatDialogRef<ListeLivreurComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.city=data.city;
  }

  ngOnInit(): void {

    this.RetrieveAllLivreur(this.city);
  }

  RetrieveAllLivreur(city){
    this.UserService.getUserByRoleLivreurAndCity(city).subscribe(
      (response:User[]) =>{
        setTimeout(()=>{
          this.livreurs = response;
        })
      }
    )
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close(this.livreur);
  }
}
