import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

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

  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<boolean>();
  tmp: any;
  constructor(public dialog: MatDialog){

  }

  showContent: boolean = false;

  deleteNote(): void{
    this.delete.emit(true);
  }

  updateNote(): void{
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((note: Note) => {
      this.tmp = this.data;
      if(note.testo != "")
        this.tmp.testo = note.testo;

      if(note.titolo != "")
        this.tmp.titolo = note.titolo;

      if(note.bgcolor != "")
        this.tmp.bgcolor = note.bgcolor;

      console.log(this.tmp);
      this.update.emit(this.tmp);
    });
    
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
