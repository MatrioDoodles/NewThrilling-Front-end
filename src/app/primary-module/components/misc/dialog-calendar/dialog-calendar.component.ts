import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-calendar',
  templateUrl: './dialog-calendar.component.html',
  styleUrls: ['./dialog-calendar.component.scss']
})
export class DialogCalendarComponent implements OnInit {
date:Date;
  constructor(private dialogRef: MatDialogRef<DialogCalendarComponent>,
              ) {
  }
  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close(this.date);
  }
}
