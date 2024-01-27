import { Component, Inject, TemplateRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

export interface IDynamicDialogConfig {
	title?: string;
	acceptButtonTitle?: string;
	declineButtonTitle?: string;
	dialogContent: TemplateRef<any> ;
  }

@Component({
  selector: 'app-dialogbottomsheet',
  templateUrl: './dialogbottomsheet.component.html',
  styleUrls: ['./dialogbottomsheet.component.css']
})
export class DialogbottomsheetComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<DialogbottomsheetComponent>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: IDynamicDialogConfig) {
        data.acceptButtonTitle ?? 'Yes';
        data.title ?? 'Unnamed Dialog'; }
    
    
    closeBottomSheet() {
      const dataToReturn = { result: 'Success' };
      this.bottomSheetRef.dismiss(dataToReturn);
    }
    dismissBottomSheet(){
      this.bottomSheetRef.dismiss();
    }

  

}
