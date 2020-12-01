import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellRange, ColDef, GridOptions } from 'ag-grid-community';
import { BotoesGridComponent } from 'src/app/shared/botoes-grid/botoes-grid.component';
import { UtilService } from 'src/app/shared/utils.service';

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

  ngOnInit(){
    this.columns = [
      { headerName: '#', field: 'id', maxWidth: 85, minWidth: 85, filter: 'number', sort: 'asc' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Fullname', field: 'fullname', },
      { headerName: 'Gender', field: 'gender', filter: 'set' },
      { headerName: 'Nickname', field: 'nickname', },
      { headerName: 'Preferencialname', field: 'preferencialname', },
    ]
    this.entityService = this.service
  }
}
