import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { BehaviorSubject } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { UtilService } from '../shared/utils.service'
import { Auth } from './auth'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false)

  private api: string = environment.curriculumApi

  constructor(
    private http: HttpClient,
    private utils: UtilService,
    private router: Router,
  ) { }

  get isLoggedIn() {
    this.verificaSessao()
    return this.loggedIn.asObservable()
  }

  login(signin) {
    const payload = JSON.stringify(signin)
    return this.http.post<Auth>(`${this.api}/user/signin`, payload, httpOptions)
      .pipe(
        tap((response) => {
          delete signin.secret

          if (response?.token) {
            localStorage.setItem('currentUser', JSON.stringify({
              id: response._id,
              avatar: response.avatar,
              email: response.email,
              role: response.role,
              name:  response.name,
              token: response.token,
            }))

            const expiresAt = moment().locale(this.utils.getLanguage()).add(parseInt(response.expiresIn.replace('h', '')), 'h').calendar()
            localStorage.setItem('expires_at', JSON.stringify(expiresAt))

            localStorage.setItem('logged', JSON.stringify(response.auth))
            this.loggedIn.next(true)

            location.href = '/'

            this.utils.sendMessage(`Sua sessão irá expirar ${expiresAt.toLowerCase()}`, 10000)
          } else {
            this.loggedIn.next(false)
            this.router.navigate(['/login'])
          }
        }),
        catchError(error => this.utils.handleError(error))
      )
  }

  register(register) {
    return this.http.post<any>(this.api + '/user/signup', register, httpOptions).pipe(
      tap((user) => {
        this.utils.sendMessage(`Seja bem vindo ${register.nickname}!! Você será redirecionado para o login`)
      }),
      catchError(this.utils.handleError('addUser'))
    )
  }

  logout() {
    localStorage.clear()
    this.loggedIn.next(false)
    location.href = '/login'
  }

  private verificaSessao() {

    if (!String(this.utils.getSessao('token'))) return this.loggedIn.next(false)
    if (!String(this.utils.getSessao('logged'))) return this.loggedIn.next(false)

    if (!this.getExpiration()) {
      return this.logout()

    }
    // Se tiver sessão e não expirou!
    this.loggedIn.next(true)
  }

  getExpiration() {
    return true
  }

}
