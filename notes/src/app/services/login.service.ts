import { Injectable, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Auth, GoogleAuthProvider, User, getAuth, signInAnonymously, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { DocumentData, DocumentReference, FieldValue, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getFirestore, limit, orderBy, query, serverTimestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  private provider = new GoogleAuthProvider();
  router: Router = inject(Router);
  
  // observable that is updated when the auth state changes
  user$ = user(this.auth);
  currentUser: User | null = this.auth.currentUser;
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.currentUser = aUser;
    });
  }

  // Login Friendly Chat.
  loginGoogle() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.router.navigate(['/', 'app']);
      return credential;
    })
  }

  loginUnknowned() {
    signInAnonymously(this.auth)
      .then(() => {
        const auth = getAuth();
        this.router.navigate(['/', 'app']);
        return auth;
      })
  }

  // Logout of Friendly Chat.
  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/', 'app'])
      console.log('signed out');
    }).catch((error) => {
        console.log('sign out error: ' + error);
    })
  }

  // Adds a text or image message to Cloud Firestore.
  addMessage = async(textMessage: string | null): Promise<void | DocumentReference<DocumentData>> => {
    let data: any;
    try {
      this.user$.subscribe(async (user: { displayName: any; uid: any; }) => 
      { 
        if(textMessage && textMessage.length > 0) {
          data =  await addDoc(collection(this.firestore, 'notes'), {
            name: user?.displayName,
            text: textMessage,
            timestamp: serverTimestamp(),
            uid: user?.uid
          })
        }
          return data;
        }
      );
    }
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
      return;
    }
  }


  deleteNote(id: string) {
    const db = getFirestore(initializeApp(environment.firebase));
    deleteDoc(doc(db, 'notes', id)); // Elimina il documento dalla collezione "notes"
  }
}
