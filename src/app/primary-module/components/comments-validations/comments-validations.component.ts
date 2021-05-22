import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Comment} from "../../../services/comments/comments.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentsService} from "../../../services/comments/comments.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmAnnulationComponent} from "../misc/confirm-annulation/confirm-annulation.component";

@Component({
  selector: 'app-comments-validations',
  templateUrl: './comments-validations.component.html',
  styleUrls: ['./comments-validations.component.scss']
})
export class CommentsValidationsComponent implements OnInit {


  Comments:Comment [];
  loading: boolean = true;
  CommentType;
  btnname:string;

  constructor(private CommentService:CommentsService,
              private route:Router,
              private router: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.RetrieveAllComments();
    this.loading = false;
  }

  RetrieveAllComments(){
    this.CommentService.getNoneApprouvedComment().
    subscribe(
      (data: any) => {
        this.Comments = data
      }
    )}
  Approuving(SelectedComment:Comment){
    let choice;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data ={
      msg:"Etes vous sure de vouloir approuver le commentaire " + SelectedComment.id
    }
    const dialogRef = this.dialog.open(ConfirmAnnulationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        choice = data
        if(choice != null && choice != undefined) {
          SelectedComment.approuved = true;
          this.CommentService.UpdateCommentBYid(SelectedComment).subscribe(
            data => {this.RetrieveAllComments();}
          )
        }
      }
    );


  }
  Supprimer(SelectedComment){
    let choice;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data ={
      msg:"Etes vous sure de vouloir supprimer le commentaire " + SelectedComment.id
    }
    const dialogRef = this.dialog.open(ConfirmAnnulationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        choice = data
        if(choice != null && choice != undefined) {
          this.CommentService.deleteCommentById(SelectedComment).
          subscribe(
            response => this.RetrieveAllComments()
          );
        }
      }
    );

  }

}
