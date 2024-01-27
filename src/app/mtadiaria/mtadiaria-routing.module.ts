import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainmetadiariaComponent } from './mainmetadiaria/mainmetadiaria.component';

const routes: Routes = [
  {
    //dashboard/main/metadiaria/mainmetadiaria
    path:'mainmetadiaria',
    component:MainmetadiariaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MtadiariaRoutingModule { }
