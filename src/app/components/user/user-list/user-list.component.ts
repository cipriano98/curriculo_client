import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellRange, GridOptions } from 'ag-grid-community';
import { BotoesGridComponent } from 'src/app/shared/botoes-grid/botoes-grid.component';
import { UtilService } from 'src/app/shared/utils.service';

import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  private columnDefs;
  public gridOptions: GridOptions;

  constructor(
    private service: UserService,
    private utils: UtilService,
    public dialog: MatDialog
  ) {

    this.columnDefs = [
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
    ];

    this.gridOptions = <GridOptions>{
      defaultColDef: {
        enableCellChangeFlash: true,
        filter: 'agTextColumnFilter',
        resizable: true,
        sortable: true,
        flex: 1,
        autoHeight: true,
        maxWidth: 400,
        // floatingFilter: false
      },
      columnDefs: this.columnDefs,
      immutableData: true,
      editType: 'fullRow',
      multiSortKey: 'ctrl',
      floatingFilter: true,
      enableFillHandle: true,
      fillHandleDirection: 'x',
      animateRows: true,
      enableRangeHandle: true,
      context: {
        componentParent: this
      },
      frameworkComponents: {
        BotoesGridComponent
      },
      suppressCellSelection: true,
      pagination: true,
      paginationPageSize: 50,
      sideBar: true,
      rowDragMove: true,
      // enableRangeSelection: true,
      debounceVerticalScrollbar: true,
      onRowDoubleClicked: row => {
        this.edit(row.data.id)
      },
      // getContextMenuItems: this.getContextMenuItems,
      getRowNodeId: this.getRowNodeId
    };
    

  }

getRowNodeId(data: CellRange) {
    return data.id
  }


  onGridReady(params) {
    this.service.getBase().subscribe(user => {});
    this.service.listaInicial$.subscribe(
      user => {
        params.api.setRowData(user);
        this.service.listaUpdates$.subscribe(newRowData => {
          params.api.updateRowData({ update: newRowData });
        });
      });
  }

  edit(id) {
    this.utils.openEditModal(UserEditComponent, id);
  }

  delete(user): void {
    this.service.deleteBase(user).subscribe(() => { });
  }

}


