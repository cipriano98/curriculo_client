import { Component, OnInit } from '@angular/core'
import { UtilService } from 'src/app/shared/utils.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  persona: string

  constructor(
    private readonly utils: UtilService
  ) { }

  ngOnInit() {
    this.persona =
      String(this.utils.getSessao('name')) ||
      String(this.utils.getSessao('email')) ||
      'Visitante'
  }

}
