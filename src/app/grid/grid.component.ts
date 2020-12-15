import { Component, Input, OnInit } from '@angular/core'
import { CellEvent, CellRange, ColDef, GetContextMenuItemsParams, GridOptions, MenuItemDef } from 'ag-grid-community'
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
  updatingTable: boolean = false
  gridParams: CellEvent

  @Input() public entity: string
  @Input() public typeUser?: string
  @Input() public entityEdit: any
  @Input() public entityService: any
  @Input() public columns: ColDef[]

  private action: ColDef = {
    headerName: 'Action',
    field: 'value',
    cellRenderer: 'BotoesGridComponent',
    colId: 'params',
    maxWidth: 80,
    minWidth: 80,
    sortable: false,
    filter: false,
    resizable: false,
  }

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
        filter: 'text',
        resizable: true,
        sortable: true,
        flex: 1,
        autoHeight: true,
        maxWidth: 400,
        minWidth: 150,
      },
      unSortIcon: true,
      columnDefs: [].concat(
        this.action,
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

  getContextMenuItems(params: GetContextMenuItemsParams) {
    const data = params.node.data
    const component = params.context.componentParent

    const addNew: MenuItemDef = {
      name: 'Adicionar',
      action: () => {
        component.edit(0)
      },
      icon: '<i class="material-icons">add</i>'
    }
    const copyUUID: MenuItemDef = {
      name: 'Copiar UUID',
      action: () => {
        alert(`ID: ${data.id}, UUID: ${data.uuid}`);
      },
      cssClasses: ['redFont', 'bold'],
    }
    const alter = {
      name: 'Alterar',
      action: () => {
        component.edit(data.id)
      },
      tooltip: 'Alterar',
      icon: '<i class="material-icons">edit</i>'
    }
    const deletePermanently: MenuItemDef = {
      name: 'Excluir',
      action: () => params.context.componentParent.delete(params.node.data.id),
      tooltip: 'Excluir',
      icon: '<i class="material-icons">delete</i>'
    }

    return [
      addNew,
      alter,
      deletePermanently,
      {
        name: 'Always Disabled',
        disabled: true,
        tooltip: 'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
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
          }
        ],
      },
      'separator',
      copyUUID,
      'copy',
    ];
  }

  onGridReady(params) {
    this.gridParams = params
    if (this.typeUser) this.entityService.getBase(this.typeUser).subscribe(entity => { })
    else this.entityService.getBase().subscribe(entity => { })
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

  refresh() {
    this.updatingTable = true
    if (this.typeUser) this.entityService.getBase(this.typeUser).subscribe(entity => { })
    else this.entityService.getBase().subscribe(entity => { })
    const api = this.gridParams.api

    for (let i = 0; i < api.getDisplayedRowCount(); i++) {
      const milliseconds = i * 100
      const rowNodes = [api.getDisplayedRowAtIndex(i)]
      const params = {
        force: true,
        rowNodes: rowNodes,
      }

      setTimeout(function () {
        api.refreshCells(params);
      }, milliseconds)

    }

    setTimeout(() => {
      this.updatingTable = false
    }, api.getDisplayedRowCount() * 110)
  }

}
