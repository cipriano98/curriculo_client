import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
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

  constructor(
    public dialogRef: MatDialogRef<VacancyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vacancyService: VacancyService,
    private fb: FormBuilder,
    private utils: UtilService,
  ) { }

  ngOnInit(): void {
    this.id = this.data.idEdicao
    console.dir(this.data.idEdicao);
    console.dir(this.id);
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
  
  onSubmit() {
    if (this.vacancyForm.valid) {
      console.dir(this.vacancyForm.value)
      this.vacancyService.saveBase(this.vacancyForm.value).subscribe(() => { this.dialogRef.close() })
    } else {
      this.utils.emitirErrosSubmit(this.vacancyForm)
    }
  }
  
}