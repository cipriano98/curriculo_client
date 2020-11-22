import { Component } from '@angular/core'
import { CellClassParams, ColDef } from 'ag-grid-community'
import { UtilService } from 'src/app/shared/utils.service'

import { OrganizacaoEditComponent } from '../organizacao-edit/organizacao-edit.component'
import { OrganizacaoService } from '../organizacao.service'

@Component({
  selector: 'app-organizacao-list',
  templateUrl: './organizacao-list.component.html',
  styleUrls: ['./organizacao-list.component.scss']
})
export class OrganizacaoListComponent {

  entity: string = 'Agency'
  entityEdit: any = OrganizacaoEditComponent
  service: OrganizacaoService
  columns: ColDef[]

  constructor(
    private readonly OrganizacaoService?: OrganizacaoService,
    private readonly utils?: UtilService
  ) { }

  ngOnInit() {
    this.service = this.OrganizacaoService
    this.columns = [
      {
        headerName: 'Nome',
        field: 'name',
        tooltipField: 'nome',
      },
      {
        headerName: 'Registro Federal',
        field: 'registroFederal',
        cellRenderer: (param: CellClassParams) => {
          if (param.value && (param.value.length === 11 || param.value.length === 14))
            return this.utils.formatarCpfOuCnpj(param.value)
          return param.value
        },
        filter: false,
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

  /* 
  id: string
  name: string
  registrofederal: string
  role: Role
  site: string
  links: string[]
  labellinks: string[]
  active: true
  */
}
