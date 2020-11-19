import { Component } from '@angular/core';
import { CellClassParams, CellRange, ColDef, GetContextMenuItemsParams, GridOptions, MenuItemDef } from 'ag-grid-community';
import { BotoesGridComponent } from 'src/app/shared/botoes-grid/botoes-grid.component';
import { UtilService } from 'src/app/shared/utils.service';

import { OrganizacaoEditComponent } from '../organizacao-edit/organizacao-edit.component';
import { OrganizacaoService } from '../organizacao.service';

import 'ag-grid-enterprise';

@Component({
  selector: 'app-organizacao-list',
  templateUrl: './organizacao-list.component.html',
  styleUrls: ['./organizacao-list.component.scss']
})
export class OrganizacaoListComponent {

  private columnDefs: ColDef[];
  public gridOptions: GridOptions;

  constructor(
    private service?: OrganizacaoService,
    private utils?: UtilService
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
      {
        headerName: 'Nome',
        field: 'nome',
        tooltipField: 'nome',
      },
      {
        headerName: 'CPF',
        field: 'registroFederal',
        cellRenderer: param => {
          if (param.value && (param.value.length === 11 || param.value.length === 14))
            return this.utils.formatarCpfOuCnpj(param.value)
          return param.value
        },
        filter: false,
      },
      {
        headerName: 'Versão',
        field: 'versaoSistema',
        cellRenderer: (param: CellClassParams) => {
          if (param.value == null || param.value == 0) {
            return `<span style="color: #e91f1f">Permitir acesso para <b>ZWARelease</b></span>`;
          }
          return param.value;
        },
      },
    ];


    this.gridOptions = <GridOptions>{
      defaultColDef: {
        // maxWidth: 400,
        filter: 'agTextColumnFilter',
        enableCellChangeFlash: true,
        resizable: true,
        sortable: true,
        flex: 1,
        autoHeight: true,
        // floatingFilter: false
      },
      immutableData: true,
      editType: 'fullRow',
      multiSortKey: 'ctrl',
      enableFillHandle: true,
      fillHandleDirection: 'x',
      columnDefs: this.columnDefs,
      floatingFilter: true,
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
      getContextMenuItems: this.getContextMenuItems,
      getRowNodeId: this.getRowNodeId
    };

  }

  getRowNodeId(data: CellRange) {
    return data.id
  }

  onGridReady(params: GridOptions) {
    this.service.getBase().subscribe(() => { });
    this.service.listaInicial$.subscribe(
      entities => {
        params.api.setRowData(entities)
      });
  }
  
  getContextMenuItems(params: GetContextMenuItemsParams) {
    const copiarUUID: MenuItemDef = {
      name: 'Copiar UUID',
      action: () => {
        alert(`ID: ${params.node.data.id}, UUID: ${params.node.data.uuid}`);
      },
      cssClasses: ['redFont', 'bold'],
    }
    const alterar = {
      name: 'Alterar',
      action: () => {
        const data = params.node.data
        // this.edit(data.id)
        console.dir(data.id)
      },
      tooltip: 'Alterar',
      icon: '<i class="material-icons">visibility</i>'
    }
    const deletar: MenuItemDef = {
      name: 'Excluir',
      action: () => this.delete(params.node.data),
      tooltip: 'Excluir',
      icon: '<i class="material-icons">delete_outline</i>'
    }
    return [
      copiarUUID,
      alterar,
      deletar,
      {
        name: 'Always Disabled',
        disabled: true,
        tooltip:
          'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
      },
      {
        name: 'Country',
        subMenu: [/* 
          {
            name: 'Ireland',
            action: () => {
              console.log('Ireland was pressed');
            },
            // icon: createFlagImg('ie'),
          },
          {
            name: 'UK',
            action: () => {
              console.log('UK was pressed');
            },
            icon: createFlagImg('gb'),
          },
          {
            name: 'France',
            action: () => {
              console.log('France was pressed');
            },
            icon: createFlagImg('fr'),
          },
         */],
      },
      {
        name: 'Person',
        subMenu: [
          {
            name: 'Sean',
            action: () => {
              console.log('Sean was pressed');
            },
          },
          {
            name: 'John',
            action: () => {
              console.log('John was pressed');
            },
          },
          {
            name: 'Alberto',
            action: () => {
              console.log('Alberto was pressed');
            },
          },
          {
            name: 'Tony',
            action: () => {
              console.log('Tony was pressed');
            },
          },
          {
            name: 'Andrew',
            action: () => {
              console.log('Andrew was pressed');
            },
          },
          {
            name: 'Kev',
            action: () => {
              console.log('Kev was pressed');
            },
          },
          {
            name: 'Will',
            action: () => {
              console.log('Will was pressed');
            },
          },
        ],
      },
      'separator',
      'copy',
      'separator',
      'chartRange',
    ];
  }

  public edit(id) {
    this.utils.openEditModal(OrganizacaoEditComponent, id);
  }

  delete(entity): void {
    this.service.deleteBase(entity).subscribe(() => { });
  }

}
