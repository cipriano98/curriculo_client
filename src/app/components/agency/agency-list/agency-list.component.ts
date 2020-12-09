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
      { headerName: 'Name', field: 'name', },
      { headerName: 'Federal Register', field: 'registrofederal', },
      { // Site
        headerName: 'Site',
        field: 'site',
        cellRenderer: (param) => {
          // Verificar se a scren é menor que 780px para mostrar somente o ícone
          const style = `style="color:#1a53ff`
          const spanIcon = `<span class="material-icons" ${style}">launch</span>`
          return `<a href=${param.value} target="_blank">${spanIcon}</a>&nbsp;&nbsp;&nbsp; <i>${param.value}</i>`
        },
      },
    ]
  }

}
