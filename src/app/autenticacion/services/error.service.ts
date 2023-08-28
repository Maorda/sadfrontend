import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  msjError(e: HttpErrorResponse) {
    
    if (e.error.message) {
      
      console.error(e.error.message, 'Error');
    } else {
      console.error('Upps ocurrio un error, comuniquese con el administrador', 'Error');
    }
  }
}
