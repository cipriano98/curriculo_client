import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { BehaviorSubject } from 'rxjs'

import { map } from '../../../node_modules/rxjs/operators'
import { api, environment } from '../../environments/environment'
import { UtilService } from '../shared/utils.service'
import { Auth } from './auth'

const login =
  `${api.production}/user/signin`
  // `${api.localhost}/user/signin`
  // `${api.test}/usuario/signin`

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

  // private api = environment.curriculumApi

  constructor(
    private http: HttpClient,
    private utils: UtilService,
    private router: Router,
  ) {
    String(this.utils.getSessao('token'))
  }

  get isLoggedIn() {
    this.verificaSessao()
    return this.loggedIn.asObservable()
  }

  login(user) {
    user['password'] = user.secret
    const body = JSON.stringify(user)
    return this.http.post<Auth>(login, body, httpOptions)
      .pipe(
        map((response) => {
          console.log(`response → ${JSON.stringify(response)}`)

          if (response?.token) {
            localStorage.setItem('currentUser', JSON.stringify({ 
              id: response._id,
              email: response.email,
              role: response.role,
              name: response.name,
              token: response.token
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

        })
      )
  }

  logout() {
    localStorage.clear()
    this.loggedIn.next(false)
    location.href = '/login'
  }

  private verificaSessao() {

    if (!String(this.utils.getSessao('token'))) return this.loggedIn.next(false)

    if (!this.getExpiration()) {
      return this.logout()

    }
    // Se tiver sessão e não expirou!
    this.loggedIn.next(true)
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at')
    const expiresAt = JSON.parse(expiration)
    return moment(expiresAt)
  }

}
