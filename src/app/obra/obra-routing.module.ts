import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainObraComponent } from './main/mainobra.component';

const routes: Routes = [
  {
    /**dashboard/main/obra/mainobra */
    path:'mainobra',
    component:MainObraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObraRoutingModule { }
