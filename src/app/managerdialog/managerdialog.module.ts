import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsinoComponent } from './dialogsino/dialogsino.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogwithdynamictemplateformComponent } from './dialogwithdynamictemplateform/dialogwithdynamictemplateform.component';
import { DialogbottomComponent } from './dialogbottom/dialogbottom.component';
import { ButtonComponent } from './button/button.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogbottomsheetComponent } from './dialogbottomsheet/dialogbottomsheet.component';


@NgModule({
  declarations: [
    DialogsinoComponent,
    DialogwithdynamictemplateformComponent,
    DialogbottomComponent,
    ButtonComponent,
    DialogComponent,
    DialogbottomsheetComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatBottomSheetModule,
    MatSnackBarModule,
  ], 
  exports:[DialogsinoComponent,DialogwithdynamictemplateformComponent,DialogbottomComponent,DialogComponent, ButtonComponent]
})
export class ManagerdialogModule { }
