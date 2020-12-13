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
  avatarURL: string
  existsEmail: boolean = false
  userForm: FormGroup
  loading: boolean = false // ! Não está em uso
  alterarSenha: boolean = false
  campoSenha: string
  campoRedigiteSenha: string
  camposSenhaIguais: boolean
  step = 0

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UserService,
    private fb: FormBuilder,
    private utils: UtilService,
  ) { }

  ngOnInit() {
    this.id = this.data.idEdicao
    this.initialForm()
    if (this.id !== 0) {
      this.usuarioService.getBasePorId(this.id)
        .subscribe(
          dados => {
            this.atribuirDados(dados)
            this.avatarURL = dados['avatar']
          },
          error => {
            console.dir(error)
          }
        )
    }
  }

  setStep(index: number) {
    this.step = index
  }

  nextStep() {
    this.step++
  }

  prevStep() {
    this.step--
  }

  atribuirDados(user: User) {
    this.user = user
    this.initialForm()
    this.userForm.patchValue(this.user)
  }

  desabilitarOnSubmit() {
    if (!this.alterarSenha) {
      if (this.userForm.controls.email.status === 'INVALID' || this.existsEmail) return true
      return false
    }
    if (this.userForm.invalid || this.existsEmail || !this.camposSenhaIguais) return true
    return false
  }

  verificaCamposSenhaIguais(): boolean {
    if (this.campoRedigiteSenha === this.campoSenha) return this.camposSenhaIguais = true
    return this.camposSenhaIguais = false
  }

  getFormEmailError() {
    if (this.userForm.controls.email.value === '') return 'Digite seu melhor email'

    if (this.userForm.controls.email.status === 'INVALID') return 'Digite um email válido'

    return this.existsEmail ? 'Esse email já existe em nossa base de dados' : ''
  }

  getFormPasswordError() {
    // console.log('lenght', (this.usuarioForm.controls.newPassword.value).lenght)

    if (this.userForm.controls.newPassword.status === 'INVALID') return 'Digite uma senha'

    // if (this.usuarioForm.controls.newPassword.value.lenght < 6) return 'Sua senha deve possuir pelo menos 6 caracteres'

    return !this.camposSenhaIguais ? 'Os campos não coincidem' : ''
  }

  permitirAlterarSenha() {
    // console.log(this.alterarSenha)
    /* if (this.alterarSenha) this.userForm.controls.secret.setValue('')
    else */ this.userForm.controls.secret.setValue(this.userForm.value.secret)
    return this.alterarSenha = !this.alterarSenha
  }

  verificaEmailExiste(formEmail: string) {
    // VERIFICAR se o formularioEmail foi alterado. Só depois buscar no banco

    if (this.userForm.controls.email.valid) {
      return this.usuarioService.getBasePorEmail(formEmail).subscribe(
        user => {
          if (user.email === this.userForm.value.email && user.id !== this.id) this.existsEmail = true
          else if (user.email === null) this.existsEmail = false
        }
      )
    }

    return ''
  }

  fetchCEP(formCEP: string) {
    formCEP = String(formCEP)
    this.usuarioService.fetchCEP(formCEP).subscribe(
      cep => {
        console.dir(cep)
      }
    )
  }

  onSubmit() {
    if (!this.existsEmail) {
      this.user = Object.assign(this.user, this.userForm.value)
      this.usuarioService.saveBase(this.user).subscribe(() => { this.dialogRef.close() })
    } else this.utils.emitirErrosSubmit(this.userForm)
  }

  initialForm() {
    this.userForm = this.fb.group({
      id: [undefined],
      gender: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      secret: ['', Validators.required],
      cpf: ['', Validators.required],
      nickname: [`Novo-Usuario-${Math.random().toString(36).substring(8)}`],
      newPassword: ['', Validators.required],
      datebirth: [''],
      avatar: [''],
      preferencialname: [''],
      // Address: {
      //   create: {
      //     name: [''],
      //     cep: [''],
      //     logradouro: [''],
      //     bairro: [''],
      //     cidade: [''],
      //     state: [''],
      //   }
      // },
    })
  }

  randomNickname() {
    const randomName = this.userForm.get('nickname').value?.split('-')[0] || this.userForm.get('email').value?.split('@')[0]
    const random = Math.random().toString(36).substring(8)
    this.userForm.get('nickname').setValue(`${randomName}-${random}`)
  }

}
