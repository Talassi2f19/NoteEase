import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note.model';
import { FirebaseService } from '../servizi/firebase.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent {
  @Input() data: Note = {
    id: '',
    titolo: '',
    testo: '',
    bgcolor: '#0000FF',
  };
  @Output() delete = new EventEmitter<string>();

  deleteNote() {
    this.delete.emit(this.data.id);
  }

  showContent: boolean = false;

  checkContent(): void{
    this.showContent = true;
  }
  
  decheckContent(): void{
    this.showContent = false;
  }

}
