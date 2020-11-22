import { Component, OnInit } from '@angular/core'
import { ColDef } from 'ag-grid-community'

import { UtilService } from 'src/app/shared/utils.service'
import { UserEditComponent } from '../user/user-edit/user-edit.component'
import { UserService } from '../user/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fulano: string
  entity: string = 'User'
  entityEdit: any = UserEditComponent
  service: UserService
  columns: ColDef[] = [
    {
      headerName: 'Ação',
      field: 'value',
      cellRenderer: 'BotoesGridComponent',
      colId: 'params',
      maxWidth: 80,
      minWidth: 80,
      sortable: false,
      filter: false,
      resizable: false,
    },
    { headerName: '#', field: 'id', maxWidth: 85, minWidth: 85, },
    { headerName: 'Email', field: 'email', },
    { headerName: 'Fullname', field: 'fullname', },
    { headerName: 'Gender', field: 'gender', },
    { headerName: 'Nickname', field: 'nickname', },
    { headerName: 'Preferencialname', field: 'preferencialname', },
  ] 

  constructor(
    private readonly userService: UserService,
    private readonly utils: UtilService
  ) { 

    this.fulano = String(this.utils.getSessao('email')) || 'Fulano'
    this.service = this.userService
}

  ngOnInit() {
  }

}
