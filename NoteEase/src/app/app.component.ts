import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { Note } from './note.model';
import { FirebaseService } from './servizi/firebase.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
  notes: Note[] = [];
  cont: number = 0;
  
  constructor(
    private firebase: FirebaseService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  private loadNotes(): void {
    this.firebase.get('https://notes-fdaaa-default-rtdb.europe-west1.firebasedatabase.app/notes.json')
    .subscribe((data : any) => {
      this.notes = Object.keys(data).map((key) => {
        data[key]['id'] = key;
        return data[key];
      });
      console.log(this.notes);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(note => {
      note.id = this.cont++;
      this.notes.push(note);
      console.log(this.notes);

      this.firebase.insert(
        'https://notes-fdaaa-default-rtdb.europe-west1.firebasedatabase.app/notes.json',
        {titolo: note.titolo, testo: note.testo, bgcolor: note.bgcolor}
      ).subscribe(data => {});
    });
  }

  deleteNote(id: string) {
    this.firebase.remove('https://notes-fdaaa-default-rtdb.europe-west1.firebasedatabase.app/notes', id)
    .subscribe(data => {});
  }
  

}
