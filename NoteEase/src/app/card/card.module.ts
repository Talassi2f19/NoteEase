import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { CardComponent } from './card.component';



@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
