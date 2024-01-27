import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodoRoutingModule } from './periodo-routing.module';
import { PeriodoComponent } from './periodo/periodo.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from 'src/app/autenticacion/interceptors/add-token.interceptor';
@NgModule({
  declarations: [
    PeriodoComponent
  ],
  imports: [
    CommonModule,
    PeriodoRoutingModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  exports:[PeriodoComponent],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }]

})
export class PeriodoModule { }
