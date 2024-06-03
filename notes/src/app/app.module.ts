import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';

import { environment } from '../environments/environments';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { CardModule } from './card/card.module';

@NgModule({
  declarations: [
    AppComponent,
    DialogContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CardModule,
    FormsModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      /*if (location.hostname === 'localhost') {
          connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      }*/
      return auth;
  }),
    provideFirestore(() => {
      const firestore = getFirestore();
      /*if (location.hostname === 'localhost') {
          connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
      }*/
      return firestore;
  }),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
