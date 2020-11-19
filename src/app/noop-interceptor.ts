import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { UtilService } from './shared/utils.service';

environment.production ?
  console.log('\n\n\nCurrículo Único\n\n\n\n')
  : (
    console.log('Localhost'),
    console.log("LocalStorage:", JSON.parse(localStorage.getItem('currentUser')))
  )

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {

  constructor(
    private utils: UtilService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({ headers: req.headers.set('x-access-token', String(this.utils.getSessao('token'))) })

    return next.handle(req).pipe(
      map((res: HttpEvent<any>) => { return res }),
      catchError((errorResponse: HttpErrorResponse) => {
        let mensagem = errorResponse.error.message || errorResponse.message
        if (errorResponse.url) {
          if (errorResponse.url.indexOf('/api/v1/usuario/signin')) {
            this.utils.emitirMensagem(mensagem, 5000)
          }
          else if (errorResponse.url.indexOf('/api/v1/user/signin')) {
            this.utils.emitirMensagem(mensagem, 5000)
          }
        }
        this.utils.handleError(mensagem)
        return throwError(mensagem);
      })
    );
  }

}
