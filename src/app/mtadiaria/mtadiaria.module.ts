import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MtadiariaRoutingModule } from './mtadiaria-routing.module';
import { MainmetadiariaComponent } from './mainmetadiaria/mainmetadiaria.component';


@NgModule({
  declarations: [
    MainmetadiariaComponent
  ],
  imports: [
    CommonModule,
    MtadiariaRoutingModule
  ]
})
export class MtadiariaModule { }
