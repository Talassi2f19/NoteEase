import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogContentComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  entryComponents: [DialogContentComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
