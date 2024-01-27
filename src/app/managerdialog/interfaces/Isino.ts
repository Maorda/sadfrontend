import { TemplateRef } from "@angular/core";

export interface IDynamicDialogConfig {
    title?: string;
    acceptButtonTitle?: string;
    declineButtonTitle?: string;
    dialogContent: TemplateRef<any>;
    matdialogcontent_height:string;
    matdialogcontent_width:string;
  }

export interface confMsg{
    title:string;
    typeMsg:string;
    msg:string;
    panelClass:string;
    template:TemplateRef<any> | undefined
}