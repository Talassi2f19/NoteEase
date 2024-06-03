import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoginService } from './services/login.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { initializeApp } from '@angular/fire/app';
import { collection, doc, getDocs, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { environment } from '../environments/environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  message: string = '';
  title = 'notes';
  user$: Observable<User | null>;
  notes: any[] = [];

  constructor(private loginService: LoginService) {
    this.user$ = this.loginService.user$;
  }

  ngOnInit() {
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);

    const notesCollection = collection(db, "notes");

    // Sottoscrizione agli aggiornamenti in tempo reale della collezione "notes"
    onSnapshot(notesCollection, (snapshot) => {
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
    }, (error) => {
      console.error("Errore durante il recupero degli aggiornamenti:", error);
    });

  }

  loginGoogle() {
    this.loginService.loginGoogle();
  }

  loginUnknowed() {
    this.loginService.loginUnknowned();
  }

  logout() {
    this.loginService.logout();
  }

  deleteNote(id: string){
    this.loginService.deleteNote(id);
  }

  async sendMessage() {
    if (this.message.trim()) {
      await this.loginService.addMessage(this.message);
      this.message = '';
    }
  }
}
