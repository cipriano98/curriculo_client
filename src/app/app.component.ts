import { Component, HostListener, OnInit } from '@angular/core'

import { AuthService } from './auth/auth.service'
import { UtilService } from './shared/utils.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly utils: UtilService
  ) { }

  innerWidth: any
  isLoggedIn: boolean = Boolean(localStorage.getItem('logged'))
  loginScreen: boolean

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.isLoggedIn = Boolean(localStorage.getItem('logged'))
    this.loginScreen = location.pathname === '/login'
    console.log(this.utils.getSessao())
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.innerWidth = window.innerWidth
  }

  // @HostListener('load', ['$event']) onLoad(event) {
  //   console.log(`event → ${JSON.stringify(event)}`)
  //   this.isLoggedIn = Boolean(localStorage.getItem('logged'))
  // }

  perfil() { this.authService.logout() }
  login() { location.href = '/login' }
  logout() { this.authService.logout() }
}
