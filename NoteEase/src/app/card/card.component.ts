import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent {
  @Input() data: Note = {
    id: -1,
    titolo: '',
    testo: '',
    bgcolor: '#0000FF',
  };

  showContent: boolean = false;

  @Output() delete = new EventEmitter<number>();

  onClickDelete() {
    this.delete.emit(this.data.id);
    console.log("i'd delete id card [" + this.data.id + "]");
  }

  checkContent(): void{
    this.showContent = true;
  }
  
  decheckContent(): void{
    this.showContent = false;
  }

}
