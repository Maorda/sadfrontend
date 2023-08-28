import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { BaseComponent } from './base/base.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    BaseComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
  ]
})
export class AutenticacionModule { }
