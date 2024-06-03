import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Note } from '../note.model';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.css'
})
export class DialogContentComponent {
  data: Note = {
    titolo: '',
    testo: '',
    bgcolor: '#0546ff',
  };

  constructor(public dialogRef: MatDialogRef<DialogContentComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data);
  }
}
