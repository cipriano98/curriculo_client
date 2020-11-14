import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { map } from '../../../node_modules/rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

import { Auth } from './auth';
import { UtilService } from '../shared/utils.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public token: any;
  private api = environment.curriculumApi;

  constructor(
    private http: HttpClient,
    private utils: UtilService,
    private router: Router
  ) {
    this.getToken();
  }

  get isLoggedIn() {
    // Verifica se o usuário está no local storage e não expirou
    this.verificaSessao();
    return this.loggedIn.asObservable();
  }

  login(user) {
    const body = JSON.stringify(user);
    return this.http.post<Auth>(
      // 'http://zeta08.primusweb.com.br:3017/api/v1/usuario'
      'http://localhost:3000/api/v1/user'
      + '/signin', body, httpOptions)
      .pipe(
        map((response: Auth) => {
          console.log(`response → ${JSON.stringify(response)}`)

          if (response?.token) {

            this.token = response.token;
            localStorage.setItem('currentUser', JSON.stringify({ id: response._id, email: response.email, token: response.token }));
            const expiresAt = moment().locale(this.utils.getLanguage()).add(parseInt(response.expiresIn.replace('h', '')), 'h').calendar();
            localStorage.setItem('expires_at', JSON.stringify(expiresAt));
            this.loggedIn.next(true);
            this.router.navigate(['/']);
            this.utils.emitirMensagem(`Sua sessão irá expirar ${expiresAt.toLowerCase()}`, 10000)
          } else {
            this.loggedIn.next(false);
            this.router.navigate(['/login']);
          }

        })
      );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('expires_at');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private setSession(authResult) {
    this.loggedIn.next(true);
    this.router.navigate(['/']);
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  private verificaSessao() {

    if (this.getToken() == '') {
      this.loggedIn.next(false);
      return;
    }

    if (!this.getExpiration()) {
      this.logout();
      return;
    }
    // Se tiver sessão e não expirou!
    this.loggedIn.next(true);
  }

  // logout() {
  //   localStorage.removeItem("id_token");
  //   localStorage.removeItem("expires_at");
  // }


  // get isLoggedIn() {
  //   this.loggedIn.next(false);
  //   // return moment().isBefore(this.getExpiration());
  //   return this.loggedIn.asObservable();
  // }

  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }

  getToken(): string {
    if (localStorage.getItem('currentUser') != null) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return currentUser.token
    }
    return ''
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  // getToken(user: User): Observable<User> {
  //   let body = JSON.stringify(user);
  //   return this.http.post<User>(this.zDbApi + '/login', body, httpOptions).pipe(
  //       tap((fas : User) => this.utils.log(`Fases carregadas`)),
  //       catchError(this.utils.handleError('getFases'))
  //     );
  // }
}
