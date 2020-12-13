import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/shared/utils.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-vacancy-edit',
  templateUrl: './vacancy-edit.component.html',
  styleUrls: ['./vacancy-edit.component.scss']
})
export class VacancyEditComponent implements OnInit {

  id: number
  vacancy: any
  vacancyForm: FormGroup



  constructor(
    public dialogRef: MatDialogRef<VacancyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UserService,
    private fb: FormBuilder,
    private utils: UtilService,
  ) { }

  ngOnInit(): void {
    this.id = this.data.idEdicao
    this.initialForm()
    if (this.id !== 0) {
      this.usuarioService.getBasePorId(this.id)
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
      id: [undefined],
      active: [''],
      name: [''],
      office: [''],
      logo: [''],
      description: [''],
    })
  }


  async SaveVacancy() {
  }
  
  onSubmit() {
    if (this.vacancyForm.valid) {
      this.vacancy = Object.assign(this.vacancy, this.vacancyForm.value)
      this.usuarioService.saveBaseVacancy(this.vacancy).subscribe(() => { this.dialogRef.close() })
    } else {
      this.utils.emitirErrosSubmit(this.vacancyForm)
    }

  }
  
}