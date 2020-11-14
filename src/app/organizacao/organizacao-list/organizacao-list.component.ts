import { Component, OnInit } from '@angular/core';
import { OrganizacaoService } from '../organizacao.service';
import { GridOptions } from 'ag-grid-community';
import { BotoesGridComponent } from 'src/app/shared/botoes-grid/botoes-grid.component';
import { UtilService } from 'src/app/shared/utils.service';
import { OrganizacaoEditComponent } from '../organizacao-edit/organizacao-edit.component';
import { Organizacao } from '../model/Organizacao';
import { ActionsList, ActionsListTypes } from 'src/app/shared/constants/actionsList';
import * as moment from 'moment';

@Component({
  selector: 'app-organizacao-list',
  templateUrl: './organizacao-list.component.html',
  styleUrls: ['./organizacao-list.component.scss']
})
export class OrganizacaoListComponent implements OnInit {

  inputActions: ActionsList[];

  private columnDefs;
  public gridOptions: GridOptions;
  getRowNodeId;
  acao = {
    width: 120
  }

  constructor(
    private organizacaoService: OrganizacaoService,
    private utils: UtilService
  ) {

    this.inputActions = [
      { acao: ActionsListTypes.ALTERAR },
      { acao: ActionsListTypes.EXCLUIR },
      { acao: ActionsListTypes.COPIARUUID },
    ];


    this.columnDefs = [
      {
        headerName: 'Ação',
        field: 'value',
        cellRenderer: 'BotoesGridComponent',
        colId: 'params',
        width: this.acao.width,
        suppressNavigable: true,
        suppressSorting: true,
        suppressMenu: true,
        suppressFilter: true,
        maxWidth: this.acao.width,
        minWidth: this.acao.width,
      },
      {
        headerName: 'id',
        width: 70,
        field: 'id',
        enableSorting: true,
        enableColResize: true,
      },
      {
        headerName: 'Nome',
        field: 'nome',
        enableSorting: true,
        enableColResize: true,
      },
      {
        headerName: 'Registro Federal',
        field: 'registroFederal',
        cellRenderer: param => {
          if (param.value && (param.value.length === 11 || param.value.length === 14))
            return this.utils.formatarCpfOuCnpj(param.value)
          return param.value
        }
      },
      {
        headerName: 'Ativo',
        field: 'ativo',
        cellRenderer: param => {
          const icone = cor => {
            return `<mat-icon matTooltip="${param.value}" matSuffix style="color: ${cor}">◉</mat-icon>`
          }
          if (param.value)
            return icone('#47ad0b');
          return icone('#e91f1f');
          // return `<i class="fa fa-sort-alpha-up"/>`;
        },
        cellStyle: {
          textAlign: 'center'
        },
        width: 70,
      },
      {
        headerName: 'Versão',
        field: 'versaoSistema',
        cellRenderer: param => {
          if (param.value == null || param.value == 0) {
            return `<span style="color: #e91f1f">Permitir acesso para <b>ZWARelease</b></span>`;
          }
          return param.value;
        },
        width: 90,
      },
      {
        headerName: 'Ultima Sincronização',
        field: 'sincronizacaoDate',
        tooltipField: 'sincronizacaoDate',
        cellRenderer: param => {
          if (param.value) {
            return moment(param.value).locale(navigator.language || 'en')
              .add(param.value, 'h').calendar()
          }
          return `<span style="color: #e91f1f">Sincronização pendente</span>`;
        },
        width: 170,
      }
    ];


    this.gridOptions = <GridOptions>{
      defaultColDef: {
        filter: 'agTextColumnFilter',
        enableRowGroup: true,
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
        'BotoesGridComponent': BotoesGridComponent
      },
      onRowDoubleClicked: row => {
        this.edit(row.data)
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
    this.organizacaoService.getBase().subscribe(() => { });
    this.organizacaoService.listaInicial$.subscribe(
      organizacoes => {
        params.api.setRowData(organizacoes);
        this.organizacaoService.listaUpdates$.subscribe(newRowData => {
          params.api.updateRowData({ update: newRowData });
        });
      });
  }


  public insert() {
    this.utils.openEditModal(OrganizacaoEditComponent, 0);
  }

  public edit(data) {
    this.utils.openEditModal(OrganizacaoEditComponent, data.id);
  }

  delete(organizacao: Organizacao): void {
    this.organizacaoService.deleteBase(organizacao).subscribe(() => { });
  }

}
