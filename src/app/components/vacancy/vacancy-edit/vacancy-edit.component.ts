import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { UtilService } from 'src/app/shared/utils.service'

import { VacancyService } from '../vacancy.service'

@Component({
  selector: 'app-vacancy-edit',
  templateUrl: './vacancy-edit.component.html',
  styleUrls: ['./vacancy-edit.component.scss']
})
export class VacancyEditComponent implements OnInit {

  id: number
  vacancy: any[]
  vacancyForm: FormGroup
  userId: number

  constructor(
    public dialogRef: MatDialogRef<VacancyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vacancyService: VacancyService,
    private readonly router: Router,
    private fb: FormBuilder,
    private utils: UtilService,
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.utils.getSessao('id'))
    this.id = this.data.idEdicao
    this.initialForm()
    if (this.id !== 0) {
      this.vacancyService.getBaseById(this.id)
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

  atribuirDados(vacancy) {
    this.vacancy = vacancy
    this.initialForm()
    this.vacancyForm.patchValue(this.vacancy)
  }

  initialForm() {
    this.vacancyForm = this.fb.group({
      codeVacancy: [undefined],
      active: [true],
      name: [''],
      office: [''],
      logo: [''],
      description: [''],
    })
  }

  openProfile(securityKey) {
    this.dialogRef.close()
    this.router.navigate([`profile/${securityKey}`])
  }

  onSubmit() {
    if (this.vacancyForm.valid) {
      this.vacancyService.createBase(this.vacancyForm.value, this.userId,).subscribe(() => { this.dialogRef.close() })
    } else {
      this.utils.emitirErrosSubmit(this.vacancyForm)
    }
  }

}