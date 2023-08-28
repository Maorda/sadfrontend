import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
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

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token = localStorage.getItem('token')
      
      
      if(token) {
        request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        console.log(request)
        //this.router.navigate(['dashboard'])
        //const expiry = Buffer.from(token.split('.')[1],'utf8')
       // console.log({"request":request,"token":token})
      }
      
    
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if(error.status === 401){
              this._errorService.msjError(error)
              //this.router.navigate(['autenticar/usuario/login'])
            }
            return throwError(() => error);
          })
        );
      }
}
