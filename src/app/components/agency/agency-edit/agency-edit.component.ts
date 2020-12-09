import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { UtilService } from 'src/app/shared/utils.service'

import { AgencyService } from '../agency.service'
import { Agency } from '../agency'

@Component({
  selector: 'app-agency-edit',
  templateUrl: './agency-edit.component.html',
  styleUrls: ['./agency-edit.component.scss']
})
export class AgencyEditComponent implements OnInit {

  agency: Agency
  id: number
  agencyForm: FormGroup
  loading: boolean = false

  constructor(
    public dialogRef: MatDialogRef<AgencyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private agencyService: AgencyService,
    private fb: FormBuilder,
    private utils: UtilService
  ) { }

  ngOnInit() {
    this.id = this.data.idEdicao
    this.agency = new Agency()

    this.initialForm()
    if (this.id !== 0) {
      this.agencyService.getBasePorId(this.id)
        .subscribe(
          dados => {
            this.atribuirDados(dados)
          },
          error => {
            console.dir(error)
          }
        )
    }
  }

  atribuirDados(agency: Agency) {
    this.agency = agency
    this.initialForm()
    this.agencyForm.patchValue(this.agency)
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

  async SaveAgency(): Promise<Agency> {
    this.agency = Object.assign(this.agency, this.agencyForm.value)
    return this.agencyService.saveBase(this.agency).toPromise()
  }

  onSubmit() {
    if (this.agencyForm.valid) {
      this.SaveAgency().then(agency => {
        this.agencyForm.reset()
      })
      this.closeDialog()
    } else {
      this.utils.emitirErrosSubmit(this.agencyForm)
    }
  }

  randomString() {
    return Math.random().toString(36).substring(8)
  }
  initialForm() {
    this.agencyForm = this.fb.group({
      name: [''],
      registrofederal: [''],
      site: [''],
      active: [false],
    })
  }

}
