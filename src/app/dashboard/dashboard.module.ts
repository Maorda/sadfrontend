import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ObraModule } from '../obra/obra.module';
import { ValorizacionModule } from '../valorizacion/valorizacion.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ManagerdialogModule } from '../managerdialog/managerdialog.module';
import { MtadiariaModule } from '../mtadiaria/mtadiaria.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ObraModule,
    ValorizacionModule,
    ManagerdialogModule,
    MtadiariaModule
  ],
  providers:[{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}]
})
export class DashboardModule { }
