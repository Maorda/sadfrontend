import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDynamicDialogConfig } from '../interfaces/Isino';

@Component({
  selector: 'app-dialogsino',
  templateUrl: './dialogsino.component.html',
  styleUrls: ['./dialogsino.component.css']
})
export class DialogsinoComponent implements OnInit  {
   
  
   constructor(
    private elementRef:ElementRef,
    public dialogRef: MatDialogRef<DialogsinoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDynamicDialogConfig) {
    data.acceptButtonTitle ?? 'Yes';
    data.title ?? 'Unnamed Dialog';
    //gestiona el ancho y el alto del cuadro de dialogo
    data.matdialogcontent_height ?? '121px';
    data.matdialogcontent_width ?? '221px';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    
    this.elementRef.nativeElement.style.setProperty('--matdialogcontent-height',this.data.matdialogcontent_height)
    this.elementRef.nativeElement.style.setProperty('--matdialogcontent-width',this.data.matdialogcontent_width)
  }
  

}
