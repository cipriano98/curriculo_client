import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UtilService } from './shared/utils.service';
import { environment } from 'src/environments/environment';

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

  public getToken(): string {
    if (localStorage.getItem('currentUser') != null) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return currentUser.token
    }
    return ''
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({ headers: req.headers.set('x-access-token', this.getToken()) });

    return next.handle(req).pipe(
      map((res: HttpEvent<any>) => {
        if (res instanceof HttpResponse) {

          // const status = {
          //   status: res.status,
          //   statusText: res.statusText
          // }
          // console.log(status);

        }

        return res;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
        let mensagem = errorResponse.error.message || errorResponse.message
        if (errorResponse.url) {
          if (errorResponse.url.indexOf('/api/v1/usuario/signin')) {
            this.utils.emitirMensagem(mensagem, 5000)
          }
        }
        this.utils.handleError(mensagem)
        return throwError(mensagem);
      })
    );
  }

}
