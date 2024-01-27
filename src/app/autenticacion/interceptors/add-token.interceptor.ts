import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';
import { ManagertokenService } from '../services/managertoken.service';


@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private _errorService: ErrorService,
    //private readonly managerToken:ManagetokenService
    
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token = localStorage.getItem('token')
      
  
        
        const authReq = request.clone({
          headers: request.headers.set('authorization', `${token}`)
        });
    
        // send cloned request with header to the next handler.
        return next.handle(authReq);

        /*const authReq = request.clone({
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': token
          })
        });
      
        console.log('Intercepted HTTP call', authReq);*/
      
        
    


      }
}
