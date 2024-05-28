import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dialog-example';
  notes: string[] = [];

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.notes.push(<string>result);
      console.log(this.notes);
    });
  }
}
