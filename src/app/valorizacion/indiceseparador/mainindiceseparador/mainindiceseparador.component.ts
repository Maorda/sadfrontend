import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDynamicDialogConfig } from 'src/app/managerdialog/interfaces/Isino';


@Component({
  selector: 'app-mainindiceseparador',
  templateUrl: './mainindiceseparador.component.html',
  styleUrls: ['./mainindiceseparador.component.css']
})
export class MainindiceseparadorComponent  {

  constructor(
    public dialogRef: MatDialogRef<MainindiceseparadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDynamicDialogConfig,
    
    ) {
    data.acceptButtonTitle ?? 'Yes';
    data.title ?? 'Unnamed Dialog';
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
