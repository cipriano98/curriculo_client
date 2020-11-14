import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UsuarioService } from '../usuario.service';
import { GridOptions } from 'ag-grid-community';
import { BotoesGridComponent } from 'src/app/shared/botoes-grid/botoes-grid.component';
import { UtilService } from 'src/app/shared/utils.service';
import { Usuario } from '../Usuario';
import { UsuarioEditComponent } from '../usuario-edit/usuario-edit.component';



@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  private columnDefs;
  public gridOptions: GridOptions;
  getRowNodeId;

  constructor(
    private usuarioService: UsuarioService,
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
        'BotoesGridComponent': BotoesGridComponent
      }
    };
    this.getRowNodeId = data => data.id;

  }

  ngOnInit() {
  }


  onGridReady(params) {
    this.usuarioService.getBase().subscribe(fases => {
    });
    this.usuarioService.listaInicial$.subscribe(
      fases => {
        params.api.setRowData(fases);
        this.usuarioService.listaUpdates$.subscribe(newRowData => {
          params.api.updateRowData({ update: newRowData });
        });
      });
  }

  public insert() {
    this.utils.openEditModal(UsuarioEditComponent, 0);
  }

  public edit(data) {
    this.utils.openEditModal(UsuarioEditComponent, data.id);
  }

  delete(usuario: Usuario): void {
    this.usuarioService.deleteBase(usuario).subscribe(() => { });
  }

}


