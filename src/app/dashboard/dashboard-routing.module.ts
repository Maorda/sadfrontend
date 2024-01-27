import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path:'main',
    component:DashboardComponent,
    /**cada app dentro de main es hija */
    
    children:[
      {
        /**dashboard/main/obra */
        path:'obra',
        loadChildren:()=>import('../obra/obra.module').then(m=>m.ObraModule),
       
        

      },
      
      {
        /**dashboard/main/valorizacion */
        path:'valorizacion',
        loadChildren:()=>import('../valorizacion/valorizacion.module').then(m=>m.ValorizacionModule),
        
      },
      {
        /**dashboard/main/metadiaria */
        path:'metadiaria',
        loadChildren:()=>import('../mtadiaria/mtadiaria.module').then(m=>m.MtadiariaModule),
        
      }

    ]
  },
  //{
    /**dashboard/obra */
    //path:'main/obra',
    //loadChildren:()=>import('../obra/obra.module').then(m=>m.ObraModule)
    //component:LoadtemplateComponent
  //}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
