import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainindiceseparadorComponent } from './mainindiceseparador/mainindiceseparador.component';

const routes: Routes = [
  {
    path:'main',
    component: MainindiceseparadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndiceseparadorRoutingModule { }
