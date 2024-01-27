import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { createForm, FormType, subformComponentProviders } from 'ngx-sub-form';

import { mergeMap, Subscription } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { UserService } from '../services/user.service';
import { registerForm } from '../interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers:subformComponentProviders(RegisterComponent)
})
export class RegisterComponent  {
  subscription: Subscription
  loading: boolean = false;
  usuario:registerForm

  constructor(
    private readonly usuarioService:UserService,
    private toastr: ToastrService,
    
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) { }
  

  public form = createForm<registerForm>(this,{
    formType:FormType.SUB,
    formControls:{
      email: new UntypedFormControl,
      password: new UntypedFormControl(null)
    }
  })

  registrar(){
     // Validamos que el usuario ingrese valores
     if (
      this.form.formGroup.value.email == null ||
      this.form.formGroup.value.password == null
      ){
      
        this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }


    // Creamos el objeto
    const user: registerForm = {
      email: this.form.formGroup.value.email,
      password: this.form.formGroup.value.password,
    }
    

    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {//respuesta del servidor
        
        this.loading = false;
        this.toastr.success(`El usuario ${this.form.formGroup.value.email} fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['autenticar/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
        this.toastr.error(e.error.message);
      }
    })
  }
  atraz(){
    this.router.navigate(['autenticar/login'])
  }

}
