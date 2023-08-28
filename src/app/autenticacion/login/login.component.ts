import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { createForm, FormType, subformComponentProviders } from 'ngx-sub-form';
import { Subscription } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { UserService } from '../services/user.service';
import { User, loginForm } from '../interfaces/user.interface';

export interface confMsg{
  title:string;
  typeMsg:string;
  msg:string;
  panelClass:string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  subscription: Subscription
  message:confMsg

  email: string = '';
  password: string = '';
  loading: boolean = false;

  
  constructor(
    
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
        console.log(payload.token)
        localStorage.setItem('token', payload.token);
        this.router.navigate(['dashboard/main'])
      },
      error: (e: HttpErrorResponse) => {
        console.log(e.error.message)
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
