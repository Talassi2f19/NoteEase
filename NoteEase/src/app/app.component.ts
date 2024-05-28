import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { Note } from './note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  notes: Note[] = [];
  cont: number = 0;
  
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(note => {
      note.id = this.cont++;
      this.notes.push(note);
      console.log(this.notes);
    });
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter(note => note.id !== id);
  }

}
