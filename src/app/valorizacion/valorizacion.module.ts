import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValorizacionRoutingModule } from './valorizacion-routing.module';
import { MainvalorizacionComponent } from './mainvalorizacion/mainvalorizacion.component';
import { PanelfotograficoModule } from './panelfotografico/panelfotografico.module';
import { PeriodoModule } from './periodo/periodo.module';
import { ConsolidadovalorizacionModule } from './consolidadovalorizacion/consolidadovalorizacion.module';
import { IndiceseparadorModule } from './indiceseparador/indiceseparador.module';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import {  MatButtonModule } from '@angular/material/button';
import { AddTokenInterceptor } from '../autenticacion/interceptors/add-token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AntesedentefotograficoModule } from './panelfotografico/antesedentefotografico/antesedentefotografico.module';

@NgModule({
  declarations: [
    MainvalorizacionComponent,
    
  ],
  imports: [
    CommonModule,
    ValorizacionRoutingModule,
    PanelfotograficoModule,
    AntesedentefotograficoModule,
    PeriodoModule,
    ConsolidadovalorizacionModule,
    IndiceseparadorModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule
  ],
  exports:[MainvalorizacionComponent],
  providers:[
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }],
  
})
export class ValorizacionModule { }
