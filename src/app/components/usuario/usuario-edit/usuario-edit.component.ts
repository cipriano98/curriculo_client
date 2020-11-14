import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Usuario } from '../Usuario';
import { UsuarioService } from '../usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/shared/utils.service';


@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario;
  id: number;
  emailExiste: boolean = false;
  usuarioForm: FormGroup;
  statusCode: number;
  loading = false;
  alterarSenha = false;
  campoSenha = '';
  campoRedigiteSenha = '';
  camposSenhaIguais: boolean;
  tipoSincronizacao: boolean;

  constructor(
    public dialogRef: MatDialogRef<UsuarioEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private utils: UtilService,
  ) { }

  ngOnInit() {
    this.id = this.data.idEdicao;
    this.usuario = new Usuario();
    this.resetFormulario();

    if (this.id !== 0) {
      this.usuarioService.getBasePorId(this.id)
        .subscribe(dados => {
          this.atribuirDados(dados);
        },
          errorCode => this.statusCode = errorCode);
    }
  }

  atribuirDados(usuario: Usuario) {
    this.usuario = usuario;
    this.resetFormulario();
    this.usuarioForm.patchValue(this.usuario);

  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  desabilitarOnSubimit() {
    if (!this.alterarSenha) {
      if (this.usuarioForm.controls.email.status === 'INVALID' || this.emailExiste) return true;
      return false;
    }
    if (this.usuarioForm.invalid || this.emailExiste || !this.camposSenhaIguais) return true
    return false
  }

  verificaCamposSenhaIguais(): boolean {
    if (this.campoRedigiteSenha === this.campoSenha) return this.camposSenhaIguais = true
    return this.camposSenhaIguais = false
  }

  getFormEmailError() {
    if (this.usuarioForm.controls.email.value === '') return 'Digite seu melhor email';

    if (this.usuarioForm.controls.email.status === 'INVALID') return 'Digite um email válido';

    return this.emailExiste ? 'Esse email já existe em nossa base de dados' : '';
  }

  getFormPasswordError() {
    // console.log('lenght', (this.usuarioForm.controls.newPassword.value).lenght)

    if (this.usuarioForm.controls.newPassword.status === 'INVALID') return 'Digite uma senha';

    // if (this.usuarioForm.controls.newPassword.value.lenght < 6) return 'Sua senha deve possuir pelo menos 6 caracteres';

    return !this.camposSenhaIguais ? 'Os campos não coincidem' : '';
  }

  permitirAlterarSenha() {
    // console.log(this.alterarSenha);
    if (this.alterarSenha) this.usuarioForm.controls.password.setValue('')
    else this.usuarioForm.controls.password.setValue(this.usuarioForm.value.password)
    return this.alterarSenha = !this.alterarSenha
  }

  async verificaEmailExiste(formularioEmail) {
    // VERIFICAR se o formularioEmail foi alterado. Só depois buscar no banco

    if (this.usuarioForm.controls.email.valid) {
      return this.usuarioService.getBasePorEmail(formularioEmail).subscribe(
        user => {
          if (user.email === this.usuarioForm.value.email && user.id !== this.id) this.emailExiste = true
          else if (user.email === null) this.emailExiste = false
        }
      )
    }

    return '';
  }

  onSubmit() {
    if (!this.emailExiste) {
      this.usuario = Object.assign(this.usuario, this.usuarioForm.value);
      this.usuarioService.saveBase(this.usuario).subscribe(() => { });
      this.onNoClick();
    } else this.utils.emitirErrosSubmit(this.usuarioForm);
  }

  resetFormulario() {
    this.usuarioForm = this.fb.group({
      'id': [undefined],
      'email': ['', Validators.email],
      'password': ['', Validators.required],
      'newPassword': ['', Validators.required],
    });
  }

  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1 == object2;
  }

}
