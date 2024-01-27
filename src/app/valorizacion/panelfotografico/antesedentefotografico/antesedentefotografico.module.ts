import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntesedentefotograficoRoutingModule } from './antesedentefotografico-routing.module';
import { FormulariofotografiaComponent } from './formulariofotografia/formulariofotografia.component';
import { ListafotografiasComponent } from './listafotografias/listafotografias.component';
import { VistapreviafotografiasComponent } from './vistapreviafotografias/vistapreviafotografias.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from 'src/app/autenticacion/interceptors/add-token.interceptor';

@NgModule({
  declarations: [
    FormulariofotografiaComponent,
    ListafotografiasComponent,
    VistapreviafotografiasComponent
  ],
  imports: [
    CommonModule,
    AntesedentefotograficoRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }],
  exports:[
    FormulariofotografiaComponent,
    ListafotografiasComponent,
    VistapreviafotografiasComponent
  ]
})
export class AntesedentefotograficoModule { }
