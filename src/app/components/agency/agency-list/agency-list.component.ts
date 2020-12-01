import { Component } from '@angular/core'
import { CellClassParams, ColDef } from 'ag-grid-community'

import { AgencyEditComponent } from '../agency-edit/agency-edit.component'
import { AgencyService } from '../agency.service'

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.scss']
})
export class AgencyListComponent {

  entity: string = 'Agency'
  entityEdit: any = AgencyEditComponent
  entityService: AgencyService
  columns: ColDef[]

  constructor(
    private readonly agencyService?: AgencyService,
  ) { }

  ngOnInit() {
    this.entityService = this.agencyService
    this.columns = [
      {
        headerName: 'Name',
        field: 'name',
      },
      {
        headerName: 'Federal Register',
        field: 'registrofederal',
      },
      {
        headerName: 'Site',
        field: 'site',
        cellRenderer: (param: CellClassParams) => {
          return `<span>${param.value} <i class="icon"></i></span>`
        },
      },
    ]
  }

}
