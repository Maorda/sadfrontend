import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndiceseparadorRoutingModule } from './indiceseparador-routing.module';
import { MainindiceseparadorComponent } from './mainindiceseparador/mainindiceseparador.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    MainindiceseparadorComponent
  ],
  imports: [
    CommonModule,
    IndiceseparadorRoutingModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports:[MainindiceseparadorComponent]
})
export class IndiceseparadorModule { }
