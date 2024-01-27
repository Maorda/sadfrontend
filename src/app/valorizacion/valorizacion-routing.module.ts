import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainvalorizacionComponent } from './mainvalorizacion/mainvalorizacion.component';

const routes: Routes = [
  {
    /**dashboard/main/valorizacion/mainvalorizacion */
    path:'mainvalorizacion',
    component:MainvalorizacionComponent,
    //para cada app que se encuentra dentro del mainvalorizacion le tiene que corresponder un modulo
    children:[
      {
        /**dashboard/main/valorizacion/mainvalorizacion/panelfotografico */
        path:'panelfotografico',
        loadChildren:()=>import('../valorizacion/panelfotografico/panelfotografico.module').then(m=>m.PanelfotograficoModule),
        
      },
      {
        /*dashboard/main/valorizacion/mainvalorizacion/periodo*/
        path:'periodo',
        loadChildren:()=>import('../valorizacion/periodo/periodo.module').then(m=>m.PeriodoModule),
      },
      {
        /*dashboard/main/valorizacion/mainvalorizacion/consolidado*/
        path:'consolidado',
        loadChildren:()=>import('../valorizacion/consolidadovalorizacion/consolidadovalorizacion.module').then(m=>m.ConsolidadovalorizacionModule),
      },
      {
        //dashboard/main/valorizacion/mainvalorizacion/indiceseparador
        path:'indiceseparador',
        loadChildren:()=>import('../valorizacion/indiceseparador/indiceseparador.module').then(m=>m.IndiceseparadorModule),
      },
      {
        //dashboard/main/valorizacion/mainvalorizacion/antesedentefotografico
        path:'antesedentefotografico',
        loadChildren:()=>import('../valorizacion/panelfotografico/antesedentefotografico/antesedentefotografico.module').then(m=>m.AntesedentefotograficoModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValorizacionRoutingModule { }
