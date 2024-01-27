import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { createForm, FormType, subformComponentProviders } from 'ngx-sub-form';
import { Subscription } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { UserService } from '../services/user.service';
import { User, loginForm } from '../interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';
export interface confMsg{
  title:string;
  typeMsg:string;
  msg:string;
  panelClass:string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers:subformComponentProviders(LoginComponent)
})
export class LoginComponent {

  subscription: Subscription
  message:confMsg

  email: string = '';
  password: string = '';
  loading: boolean = false;

  
  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    
    
    
  ) { }

  public form = createForm<loginForm>(this,{
    formType:FormType.SUB,
    formControls:{

      email:new UntypedFormControl(null),
      password: new UntypedFormControl(null)
    }
  })

  login(){
     // Validamos que el usuario ingrese datos
     if (this.form.formGroup.value.email == null || this.form.formGroup.value.password == null) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      

      return
    }

    // Creamos el body
    const usuario: loginForm = {
      email: this.form.formGroup.value.email,
      password: this.form.formGroup.value.password,
    }

    this.loading = true;
    this.subscription = this._userService.login(usuario).subscribe({
      next: (payload:any) => {//respuesta del servidor
        localStorage.setItem('token', payload.token);
        this.router.navigate(['dashboard/main'])
      },
      error: (e: HttpErrorResponse) => {
        
        this.toastr.error(traductor(e.error.message), 'Error');
        return
      },
      complete() {
        
        console.log('Login completado satisfactoriamente')
      },
    })

    
    

  }
  register(){
    this.router.navigate(['autenticar/registrar'])
  }
 
  
}

function traductor(e:string):string{

  const configuracion:any = {
      USER_NOT_FOUND:"Usuario no Registrado"

  }
  return configuracion[e]

}
