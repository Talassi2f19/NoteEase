import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent {
  title: string = "";
  body: string = "";

  constructor(public dialogRef: MatDialogRef<DialogContentComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.title);
  }
}
