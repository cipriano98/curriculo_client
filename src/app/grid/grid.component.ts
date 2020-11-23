import { Component, Input, OnInit } from '@angular/core'
import { CellRange, ColDef, GetContextMenuItemsParams, GridOptions, MenuItemDef } from 'ag-grid-community'
import { BotoesGridComponent } from 'src/app/shared/botoes-grid/botoes-grid.component'
import { UtilService } from 'src/app/shared/utils.service'

import 'ag-grid-enterprise'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public gridOptions: GridOptions
  @Input() public entity: string
  @Input() public entityEdit: any
  @Input() public entityService: any
  @Input() public columns: ColDef[]

  constructor(
    private utils: UtilService,
  ) { }

  ngOnInit() {
    this.gridOptions = this.buildOptions()
  }

  buildOptions() {
    return <GridOptions>{
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
      columnDefs: [].concat(
        [
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
          }
        ],
        this.columns
      ),
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
      getContextMenuItems: this.getContextMenuItems,
      getRowNodeId: this.getRowNodeId
    };
  }

  getRowNodeId(data: CellRange) {
    return data.id
  }

  onGridReady(params) {
    this.entityService.getBase().subscribe(entity => { });
    this.entityService.ListInitial$.subscribe(
      entity => {
        params.api.setRowData(entity);
        this.entityService.listUpdates$.subscribe(newRowData => {
          params.api.updateRowData({ update: newRowData });
        });
      });
  }

  edit(id) {
    this.utils.openEditModal(this.entityEdit, id);
  }

  delete(id: number | string): void {
    this.entityService.deleteBase(id).subscribe(() => { });
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

}


