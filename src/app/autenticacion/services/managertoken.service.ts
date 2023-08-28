import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagertokenService {

  gettoken():string | null{
    return localStorage.getItem('token')

  }
  setToken(token:string){
    localStorage.setItem('token',token)
  }

  deleteToken(){
    localStorage.removeItem('token')
  }
  expireToken(){
    const token = localStorage.getItem('token')|| "hola"
    const expiry = (JSON.parse(Buffer.from(token.split('.')[1],'base64').toString('ascii'))).exp;
    return expiry*1000 > Date.now()
  }
}
