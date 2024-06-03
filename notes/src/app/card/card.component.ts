import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() nomePersona: string = "";

  @Input() data: Note = {
    titolo: '',
    testo: '',
    bgcolor: '#0546ff',
  };

  @Output() update = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<boolean>();

  showContent: boolean = false;

  deleteNote(): void{
    this.delete.emit(true);
  }

  updateNote(parameter: any): void{
    this.update.emit(parameter);
  }

  checkContent(): void{
    this.showContent = true;
  }
  
  toggleBadgeVisibility() {
    this.showContent = !this.showContent;
  }

  decheckContent(): void{
    this.showContent = false;
  }
}
