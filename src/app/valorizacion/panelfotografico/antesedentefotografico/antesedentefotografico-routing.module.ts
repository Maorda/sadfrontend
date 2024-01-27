import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulariofotografiaComponent } from './formulariofotografia/formulariofotografia.component';
import { ListafotografiasComponent } from './listafotografias/listafotografias.component';
import { VistapreviafotografiasComponent } from './vistapreviafotografias/vistapreviafotografias.component';

const routes: Routes = [
  {
    /** dashboard/main/valorizacion/submenu/panelfotografico/antesedentefotografico/fotografias*/
    
    path:'fotografias/:id',
    component:ListafotografiasComponent
  },
  {
    /** dashboard/main/valorizacion/submenu/panelfotografico/antesedentefotografico/formulariofotografia*/
    path:'formulariofotografia/new',
    component:FormulariofotografiaComponent
  },
  {
    /** dashboard/main/valorizacion/submenu/panelfotografico/antesedentefotografico/vistapreviafotografia*/
    path:'vistapreviafotografia',
    component:VistapreviafotografiasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntesedentefotograficoRoutingModule { }
