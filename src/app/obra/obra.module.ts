import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObraRoutingModule } from './obra-routing.module';
import { MainObraComponent } from './main/mainobra.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AddTokenInterceptor } from '../autenticacion/interceptors/add-token.interceptor';



@NgModule({
  declarations: [
    MainObraComponent
  ],
  imports: [
    CommonModule,
    ObraRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    
    
  ],
  exports:[MainObraComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }],
})
export class ObraModule { }
