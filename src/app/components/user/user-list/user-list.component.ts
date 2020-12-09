import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  entity: string = 'User'
  entityEdit: any = UserEditComponent
  entityService: UserService
  columns: ColDef[]

  constructor(
    private readonly service: UserService
  ) { }

  ngOnInit() {
    this.columns = [
      { headerName: '#', field: 'id', maxWidth: 85, minWidth: 85, filter: 'number', sort: 'asc' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Fullname', field: 'fullname', },
      { // Gender
        headerName: 'Gender',
        field: 'gender',
        filter: 'set',
        cellRenderer: param => {
          const value = param.value
          const lower = value.slice(1).toLowerCase()
          const upper = value[0].toUpperCase()
          return upper + lower
        }
      },
      { headerName: 'Nickname', field: 'nickname', },
      { headerName: 'Preferencialname', field: 'preferencialname', },
    ]
    this.entityService = this.service
  }
}
