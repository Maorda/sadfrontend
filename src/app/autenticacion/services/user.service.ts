import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {restendpoint} from '../../endpoint/restendpoint'
import { loginForm, registerForm } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ApiUrlBase: string;
  private ApiUrlLogin: string;
  private ApiUrlRegister: string;

  constructor(private http: HttpClient) {
    this.ApiUrlBase = restendpoint.base;
    this.ApiUrlLogin = restendpoint.usuario.login;
    this.ApiUrlRegister = restendpoint.usuario.register
   }

   signIn(user: registerForm): Observable<any> {
    return this.http.post(`${this.ApiUrlBase}${this.ApiUrlRegister}`, user);
   }

   login(user: loginForm): Observable<any> {
    //https://192.168.1.86:3033/usuario/login
    
    return this.http.post(`${this.ApiUrlBase}${this.ApiUrlLogin}`, user)
   }
}
