import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {restendpoint} from '../../endpoint/restendpoint'
import { loginForm, registerForm } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: string;
  private myApiUrl: string;
  private myApiRegister: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = restendpoint.base;
    this.myApiUrl = restendpoint.usuario.login;
    this.myApiRegister = restendpoint.usuario.register
   }

   signIn(user: registerForm): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiRegister}`, user);
   }

   login(user: loginForm): Observable<any> {
    
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user)
   }
}
