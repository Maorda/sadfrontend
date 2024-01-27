import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelfotograficoRoutingModule } from './panelfotografico-routing.module';
import { MainpanelfotograficoComponent } from './mainpanelfotografico/mainpanelfotografico.component';
import { FormulariofotografiaComponent } from './antesedentefotografico/formulariofotografia/formulariofotografia.component';
import { ListafotografiasComponent } from './antesedentefotografico/listafotografias/listafotografias.component';
import { VistapreviafotografiasComponent } from './antesedentefotografico/vistapreviafotografias/vistapreviafotografias.component';
import { AntesedentefotograficoModule } from './antesedentefotografico/antesedentefotografico.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from 'src/app/autenticacion/interceptors/add-token.interceptor';


@NgModule({
  declarations: [
    MainpanelfotograficoComponent,

  ],
  imports: [
    CommonModule,
    PanelfotograficoRoutingModule,
    AntesedentefotograficoModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    
  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }],
  exports:[MainpanelfotograficoComponent]
})
export class PanelfotograficoModule { }
