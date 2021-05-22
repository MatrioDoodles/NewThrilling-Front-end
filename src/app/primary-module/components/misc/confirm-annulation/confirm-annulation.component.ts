import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-annulation',
  templateUrl: './confirm-annulation.component.html',
  styleUrls: ['./confirm-annulation.component.scss']
})
export class ConfirmAnnulationComponent implements OnInit {
message;
  constructor(private dialogRef: MatDialogRef<ConfirmAnnulationComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.message=data.msg;
  }
  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    let dd = 1;
    this.dialogRef.close(dd);
  }
}
