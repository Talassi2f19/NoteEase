import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Note } from '../note.model';


@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent {
  data: Note = {
    id: '',
    titolo: '',
    testo: '',
    bgcolor: '#0000FF',
  };

  constructor(public dialogRef: MatDialogRef<DialogContentComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data);
  }
}
