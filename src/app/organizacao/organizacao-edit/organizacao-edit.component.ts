import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organizacao } from '../model/Organizacao';
import { OrganizacaoService } from '../organizacao.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilService } from 'src/app/shared/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-organizacao-edit',
  templateUrl: './organizacao-edit.component.html',
  styleUrls: ['./organizacao-edit.component.scss']
})
export class OrganizacaoEditComponent implements OnInit {

  organizacao: Organizacao;
  id: number;
  nomeOrganizacao: string;
  spinnerLoadingApiClarion: boolean = false;
  spinnerLoadingSenhaApiClarion: boolean = false;
  apiClarionIsUp: boolean = false;
  apiSenhaClarionIsCorreta: boolean = false;
  apiClarionIsDown: string = 'Insira o link da API Clarion';
  apiSenhaClarionIsIndefinida: string = 'Insira a senha da API Clarion';
  linkApiClarionValida;
  zetaAPISenha: string;
  organizacaoForm: FormGroup;
  statusCode: number;
  loading: boolean = false;
  sincronizacaoCompleta: boolean;

  constructor(
    public dialogRef: MatDialogRef<OrganizacaoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private organizacaoService: OrganizacaoService,
    private fb: FormBuilder,
    private utils: UtilService
  ) { }

  ngOnInit() {
    this.id = this.data.idEdicao;
    this.organizacao = new Organizacao();

    this.resetFormulario();
    if (this.id !== 0) {
      this.organizacaoService.getBasePorId(this.id)
        .subscribe(
          dados => {
            const zetaAPI = {
              link: dados.zetaAPI,
              senha: dados.zetaAPISenha
            }
            const nome = dados.nome
            this.nomeOrganizacao = nome
            this.updateLinkApiClarionValida(zetaAPI.link)
            if (zetaAPI.link) this.verificaApiClarionIsUp(zetaAPI.link)
            if (zetaAPI.senha) this.zetaAPISenha = zetaAPI.senha

            this.atribuirDados(dados);
          },
          errorCode => this.statusCode = errorCode);
    }
  }

  updateZetaAPISenha(zetaAPISenha) {
    return this.zetaAPISenha = zetaAPISenha
  }
  verificarSenhaApiClarion(zetaAPISenha: string) {
    this.zetaAPISenha = zetaAPISenha
    this.spinnerLoadingSenhaApiClarion = true
    const zetaAPI = this.organizacaoForm.controls['zetaAPI'].value
    setTimeout(() => {
      if (!this.apiClarionIsUp) {
        this.apiSenhaClarionIsIndefinida = `Servidor ${this.nomeOrganizacao} fora do ar`
        this.spinnerLoadingSenhaApiClarion = false
        return this.apiSenhaClarionIsCorreta = false
      }
      this.organizacao.zetaAPI = zetaAPI
      this.organizacaoService.testarSenhaApiClarion(this.organizacao, zetaAPISenha)
        .subscribe(
          next => {
            this.apiSenhaClarionIsCorreta = true
            this.apiSenhaClarionIsIndefinida = 'Senha correta'
          },
          err => {
            this.apiSenhaClarionIsCorreta = false
            this.apiSenhaClarionIsIndefinida = 'Senha incorreta'
          }
        )
      return this.spinnerLoadingSenhaApiClarion = false
    }, 500);
  }

  updateLinkApiClarionValida(middlewareUrl) {
    return this.linkApiClarionValida = middlewareUrl.includes('http://zeta') && middlewareUrl.includes('.primusweb.com.br:') && middlewareUrl.includes('/api/v1')
  }
  verificaApiClarionIsUp(middlewareUrl: string) {
    this.updateLinkApiClarionValida(middlewareUrl)
    this.spinnerLoadingApiClarion = true
    if (!this.linkApiClarionValida || middlewareUrl.slice(-7) !== '/api/v1') {
      this.apiSenhaClarionIsIndefinida = this.apiClarionIsDown = 'Link do servidor incorreto'
      this.apiClarionIsUp = false
      this.apiSenhaClarionIsCorreta = false
      return setTimeout(() => {
        this.spinnerLoadingApiClarion = false
      }, 200);
    }

    this.organizacaoService.getApiClarion(middlewareUrl)
      .toPromise()
      .then(
        middleware => {
          this.verificarSenhaApiClarion(this.zetaAPISenha)
          if (middleware.status === 'up') {
            this.spinnerLoadingApiClarion = false
            return this.apiClarionIsUp = true
          }
          this.utils.sendMessage(this.apiClarionIsDown = `Servidor ${this.nomeOrganizacao} fora do ar`)
          this.spinnerLoadingApiClarion = false
          return this.apiClarionIsUp = false
        }
      )
  }

  atribuirDados(organizacao: Organizacao) {
    this.organizacao = organizacao;
    this.resetFormulario();
    this.organizacaoForm.patchValue(this.organizacao);
    const currentDate = moment(new Date(this.organizacao.sincronizacaoDate)).locale("pt-br").format('DD-MM-YYYY HH:mm:ss');
    this.organizacaoForm.controls['sincronizacaoDate'].setValue(currentDate);
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  async salvarOrganizacao(): Promise<Organizacao> {
    const sincronizacaoDate = this.organizacao.sincronizacaoDate;
    this.organizacao = Object.assign(this.organizacao, this.organizacaoForm.value);
    this.organizacao.sincronizacaoDate = sincronizacaoDate;
    return this.organizacaoService.saveBase(this.organizacao).toPromise();
  }

  onSubmit() {
    if (this.organizacaoForm.valid) {
      if (this.id === 0 && this.organizacaoForm.controls['ativo'].value) {
        this.sincronizarDados()
      }
      else {
        this.salvarOrganizacao().then(organizacaoSalva => {
          this.organizacaoForm.reset();
        })
      }
      this.onNoClick();
    } else {
      this.utils.emitirErrosSubmit(this.organizacaoForm);
    }
    return this.organizacaoService.agendarSync(this.organizacaoForm.value).subscribe(() => { })
  }

  // Nessessário fazer uma validação para o erro { Registro federal inválido! } ao fazer a sincronização (testes sem registro válido emite esse erro)
  sincronizarDados() {
    this.salvarOrganizacao().then(organizacaoSalva => {

      if (!this.organizacaoForm.controls['ativo'].value) {
        this.utils.sendMessage('Não é permitido sincronizar uma organização inativa')
        // ! this.onNoClick()
      }
      else if (!this.loading) {
        this.loading = true;
        this.organizacao = this.organizacaoForm.value;
        this.sincronizacaoCompleta = this.organizacaoForm.controls["tipoSincronizacao"].value;
        this.onNoClick()
        this.organizacaoService.getStatusSync(organizacaoSalva, this.sincronizacaoCompleta)
          // .subscribe(statusSync => { },
          //   error => {
          //     this.utils.emitirMensagem('Erro ao sincronizar Erro:' + error.message || error)
          //   });
        this.organizacaoService.sincronizarDados(organizacaoSalva, this.sincronizacaoCompleta)
          .subscribe(sync => {
            this.loading = false;
          }, err => {
            this.loading = false;
            this.utils.sendMessage(`Erro ao sincronizar ${organizacaoSalva.nome.toUpperCase()} Erro: ${err.message || err}`)
          });
      }
    })
  }

  resetFormulario() {
    this.organizacaoForm = this.fb.group({
      'id': [undefined],
      'nome': [''],
      'registroFederal': [''],
      'ativo': [false],
      'zetaAPI': [''],
      'zetaAPISenha': [''],
      'agendamentoTipo': [],
      'agendamentoHora': [],
      'sincronizacaoDate': [{ value: '', readonly: true }],
      'tipoSincronizacao': [false]
    });
  }

  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1 == object2;
  }

}
