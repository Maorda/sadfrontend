import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { IDynamicDialogConfig } from '../interfaces/Isino';

@Component({
  selector: 'app-dialogbottom',
  templateUrl: './dialogbottom.component.html',
  styleUrls: ['./dialogbottom.component.css']
})
export class DialogbottomComponent  {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<DialogbottomComponent >,
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
