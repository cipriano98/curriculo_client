import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../user.service';
import { GridOptions } from 'ag-grid-community';
import { BotoesGridComponent } from 'src/app/shared/botoes-grid/botoes-grid.component';
import { UtilService } from 'src/app/shared/utils.service';
import { User } from '../user';
import { UserEditComponent } from '../user-edit/user-edit.component';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private columnDefs;
  public gridOptions: GridOptions;
  getRowNodeId;

  constructor(
    private userService: UserService,
    private utils: UtilService,
    public dialog: MatDialog
  ) {

    this.columnDefs = [
      {
        headerName: 'Ação',
        tooltipField: 'Ação',
        field: 'value',
        cellRenderer: 'BotoesGridComponent',
        colId: 'params',
        width: 180,
        suppressNavigable: true,
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true
      },
      {
        headerName: 'Código',
        tooltipField: 'Código',
        field: 'id',
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
      },
      {
        headerName: 'Email',
        tooltipField: 'Email',
        field: 'email',
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
      }
    ];

    this.gridOptions = <GridOptions>{
      defaultColDef: {
        maxWidth: 400,
      },
      id: 'myGrid',
      editType: 'fullRow',
      multiSortKey: 'ctrl',
      columnDefs: this.columnDefs,
      groupSelectsChildren: true,
      floatingFilter: true,
      animateRows: true,
      enableRangeSelection: true,
      groupMultiAutoColumn: true,
      enableSorting: true,
      enableFilter: true,
      enableColResize: true,
      context: {
        componentParent: this
      },
      frameworkComponents: {
        BotoesGridComponent
      },
      onRowDoubleClicked: row => {
        this.edit(row.data.id)
      },
      suppressCellSelection: true,
      pagination: true,
      paginationPageSize: 50,
    };
    this.getRowNodeId = data => data.id;

  }

  ngOnInit() {
  }


  onGridReady(params) {
    this.userService.getBase().subscribe(fases => {
    });
    this.userService.listaInicial$.subscribe(
      fases => {
        params.api.setRowData(fases);
        this.userService.listaUpdates$.subscribe(newRowData => {
          params.api.updateRowData({ update: newRowData });
        });
      });
  }

  edit(id) {
    this.utils.openEditModal(UserEditComponent, id);
  }

  delete(user): void {
    this.userService.deleteBase(user).subscribe(() => { });
  }

}


