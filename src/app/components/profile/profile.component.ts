import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Role } from 'src/app/shared/models/Role'

import { Address } from '../../shared/models/Address'
import { Contact } from '../../shared/models/Contact'
import { UtilService } from '../../shared/utils.service'
import { User } from '../user/user'
import { UserService } from '../user/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() idEdicao
  @Input() dialogRef

  user: User
  address: Address
  contact: Contact
  id: number
  avatarURL: string
  existsEmail: boolean = false
  userForm: FormGroup
  addressForm: FormGroup
  contactForm: FormGroup
  loading: boolean = false // ! Não está em uso
  alterarSenha: boolean = false
  existUser: boolean = false
  campoSenha: string
  campoRedigiteSenha: string
  camposSenhaIguais: boolean
  step = 0

  userEmployer: boolean = false

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private readonly router: Router,
    private utils: UtilService,
  ) { }

  ngOnInit() {
    this.userEmployer = this.utils.getSessao('role') === 'EMPLOYER'
    this.id = this.idEdicao ? this.idEdicao : this.utils.getSessao("id")
    if (location.href.includes('/profile/')) {
      const candidateId = location.href.split('/profile/')[1]
      if (isNaN(Number(candidateId))) {
        this.utils.sendMessage('Perfil não encontrado')
        return this.router.navigate(['/'])
      }
      this.id = Number(candidateId)
    }
    this.initialForm()


    if (this.id !== 0) {
      this.loading = true
      this.userService.getBasePorId(this.id)
        .subscribe(
          data => {
            this.loading = false
            if (data) {
              this.existUser = true
              this.atribuirDados(data, data['Address'], data['Contact'])
              this.avatarURL = data['avatar']
            }
          },
          error => {
            this.loading = false
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

  atribuirDados(user: User, address: Address, contact: Contact) {
    this.user = user
    this.address = address
    this.contact = contact
    this.initialForm()
    this.userForm.patchValue(this.user)
    this.addressForm.patchValue(this.address)
    this.contactForm.patchValue(this.contact)
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
    if (this.userForm.controls.newPassword.status === 'INVALID') return 'Digite uma senha'
    return !this.camposSenhaIguais ? 'Os campos não coincidem' : ''
  }

  permitirAlterarSenha() {
    this.userForm.controls.secret.setValue(this.userForm.value.secret)
    return this.alterarSenha = !this.alterarSenha
  }

  verificaEmailExiste(formEmail: string) {

    if (this.userForm.controls.email.valid) {
      return this.userService.getBasePorEmail(formEmail).subscribe(
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
    this.userService.fetchCEP(formCEP).subscribe(
      cep => {
        if (!cep?.erro) {
          this.addressForm.get('cidade').setValue(cep.localidade)
          this.addressForm.get('bairro').setValue(cep.bairro)
          this.addressForm.get('logradouro').setValue(cep.logradouro)
          this.addressForm.get('state').setValue(cep.uf)
          console.dir(cep)
        }
      }
    )
  }

  onSubmit() {
    if (!this.existsEmail) {
      this.user = Object.assign(this.user, this.userForm.value)
      this.user['Address'] = { update: this.addressForm.value }
      this.user['Contact'] = { update: this.contactForm.value }
      console.dir(this.user)
      this.userService.saveBase(this.user).subscribe(() => {
        if (this.dialogRef) this.dialogRef.close()
        this.utils.sendMessage("Perfil alterado com sucesso!")
      })
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
      preferencialname: ['']
    })
    this.addressForm = this.fb.group({
      name: [''],
      cep: [''],
      logradouro: [''],
      bairro: [''],
      cidade: [''],
      state: ['']
    })
    this.contactForm = this.fb.group({
      talkto: [''],
      phone: [''],
      talktotwo: [''],
      phonetwo: ['']
    })
  }

  randomNickname() {
    const randomName = this.userForm.get('nickname').value?.split('-')[0] || this.userForm.get('email').value?.split('@')[0]
    const random = Math.random().toString(36).substring(8)
    this.userForm.get('nickname').setValue(`${randomName}-${random}`)
  }

}
