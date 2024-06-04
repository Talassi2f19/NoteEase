import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoginService } from './services/login.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { initializeApp } from '@angular/fire/app';
import { collection, doc, getDocs, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { environment } from '../environments/environments';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { Note } from './note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  nota: Note = {
    titolo: '',
    testo: '',
    bgcolor: ''
  };

  title = 'notes';
  user$: Observable<User | null>;
  notes: any[] = [];

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog,
  ) {
    this.user$ = this.loginService.user$;
  }

  ngOnInit() {
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);

    const notesCollection = collection(db, "notes");

    // Sottoscrizione agli aggiornamenti in tempo reale della collezione "notes"
    onSnapshot(notesCollection, (snapshot) => {
      console.log(this.loginService.currentUser?.uid);
      snapshot.docChanges().forEach(() => {
        this.notes = []; // Pulisce l'array prima di riempirlo con i nuovi dati
        snapshot.forEach((doc) => {
          let tmp = {
            id: doc.id,
            ...doc.data()
          }
          this.notes.push(tmp); // Aggiunge i dati del documento all'array
        });
      });
      console.log(this.notes);
    }, (error) => {
      console.error("Errore durante il recupero degli aggiornamenti:", error);
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((note: Note) => {
      console.log(note);
      this.sendMessage(note);
    });
  }

  loginGoogle() {
    this.logout();
    this.loginService.loginGoogle();
  }

  logout() {
    this.loginService.loginUnknowned();
  }

  deleteNote(id: string){
    this.loginService.deleteNote(id);
  }

  // Example method to update a note
  updateNote(id: string, event: any) {
    console.log("nota modificata" + event);
    const noteId = id; // replace with the actual ID
    this.loginService.updateNote(noteId, event);
  }

  async sendMessage(nota: Note) {
    await this.loginService.addMessage(nota);
  }
}
