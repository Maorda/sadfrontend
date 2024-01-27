import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'autenticar',
    loadChildren:()=>import('./autenticacion/autenticacion.module').then(m=>m.AutenticacionModule),
    
  },
  {
    path:'dashboard',
    loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
