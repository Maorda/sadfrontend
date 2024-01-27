import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDynamicDialogConfig } from '../interfaces/Isino';

@Component({
  selector: 'app-dialogwithdynamictemplateform',
  templateUrl: './dialogwithdynamictemplateform.component.html',
  styleUrls: ['./dialogwithdynamictemplateform.component.css']
})
export class DialogwithdynamictemplateformComponent {

  
  
  constructor(
    public dialogRef: MatDialogRef<DialogwithdynamictemplateformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDynamicDialogConfig) {
    data.acceptButtonTitle ?? 'Yes';
    data.title ?? 'Unnamed Dialog';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  hijo(miVar:string){
    console.log(miVar)
  }
    
  
  
  
}
