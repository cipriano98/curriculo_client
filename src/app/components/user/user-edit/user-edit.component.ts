import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { UtilService } from 'src/app/shared/utils.service'

import { User } from '../user'
import { UserService } from '../user.service'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User
  id: number
  existsEmail: boolean = false
  usuarioForm: FormGroup
  loading: boolean = false
  alterarSenha: boolean = false
  campoSenha: string
  campoRedigiteSenha: string
  camposSenhaIguais: boolean

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UserService,
    private fb: FormBuilder,
    private utils: UtilService,
  ) { }

  ngOnInit() {
    this.id = this.data.idEdicao
    this.user = new User()
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

  atribuirDados(user: User) {
    this.user = user
    this.initialForm()
    this.usuarioForm.patchValue(this.user)

  }

  desabilitarOnSubmit() {
    if (!this.alterarSenha) {
      if (this.usuarioForm.controls.email.status === 'INVALID' || this.existsEmail) return true
      return false
    }
    if (this.usuarioForm.invalid || this.existsEmail || !this.camposSenhaIguais) return true
    return false
  }

  verificaCamposSenhaIguais(): boolean {
    if (this.campoRedigiteSenha === this.campoSenha) return this.camposSenhaIguais = true
    return this.camposSenhaIguais = false
  }

  getFormEmailError() {
    if (this.usuarioForm.controls.email.value === '') return 'Digite seu melhor email'

    if (this.usuarioForm.controls.email.status === 'INVALID') return 'Digite um email válido'

    return this.existsEmail ? 'Esse email já existe em nossa base de dados' : ''
  }

  getFormPasswordError() {
    // console.log('lenght', (this.usuarioForm.controls.newPassword.value).lenght)

    if (this.usuarioForm.controls.newPassword.status === 'INVALID') return 'Digite uma senha'

    // if (this.usuarioForm.controls.newPassword.value.lenght < 6) return 'Sua senha deve possuir pelo menos 6 caracteres'

    return !this.camposSenhaIguais ? 'Os campos não coincidem' : ''
  }

  permitirAlterarSenha() {
    // console.log(this.alterarSenha)
    if (this.alterarSenha) this.usuarioForm.controls.password.setValue('')
    else this.usuarioForm.controls.password.setValue(this.usuarioForm.value.password)
    return this.alterarSenha = !this.alterarSenha
  }

  async verificaEmailExiste(formularioEmail) {
    // VERIFICAR se o formularioEmail foi alterado. Só depois buscar no banco

    if (this.usuarioForm.controls.email.valid) {
      return this.usuarioService.getBasePorEmail(formularioEmail).subscribe(
        user => {
          if (user.email === this.usuarioForm.value.email && user.id !== this.id) this.existsEmail = true
          else if (user.email === null) this.existsEmail = false
        }
      )
    }

    return ''
  }

  onSubmit() {
    if (!this.existsEmail) {
      this.user = Object.assign(this.user, this.usuarioForm.value)
      this.usuarioService.saveBase(this.user).subscribe(() => { })
    } else this.utils.emitirErrosSubmit(this.usuarioForm)
  }

  initialForm() {
    this.usuarioForm = this.fb.group({
      id: [undefined],
      email: ['', Validators.email],
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
    })
  }
}
