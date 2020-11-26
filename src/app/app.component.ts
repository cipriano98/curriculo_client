import { Component, HostListener, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from './auth/auth.service'
import { UtilService } from './shared/utils.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './global.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly utils: UtilService
  ) { }

  innerWidth: any
  isLoggedIn: boolean = Boolean(localStorage.getItem('logged'))
  hideHeader: boolean

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.isLoggedIn = Boolean(localStorage.getItem('logged'))
    this.hideHeader = location.pathname === '/login' || location.pathname === '/signin'
    console.log(this.utils.getSessao())
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.innerWidth = window.innerWidth
  }


  perfil() { this.router.navigate(['profile']) }
  login() { location.href = '/login' }
  signin() { location.href = '/signin' }
  logout() { this.authService.logout() }
}
