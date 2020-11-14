import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICellRendererAngularComp } from 'ag-grid-angular';

/*  import { OrganizacaoService } from '@angular/material'; */

import { OrganizacaoService } from '../../organizacao/organizacao.service';
import { ActionsList, ActionsListConstantes } from '../constants/actionsList';
import { MessagesService } from '../messages/messages.service';
import { UtilService } from '../utils.service';

@Component({
  selector: 'app-botoes-grid',
  templateUrl: './botoes-grid.component.html',
  styleUrls: ['./botoes-grid.component.scss']
})
export class BotoesGridComponent implements ICellRendererAngularComp {
  disabled: boolean = false;

  constructor(
    private utils: UtilService,
    private messageService: MessagesService,
    private organizacaoService: OrganizacaoService,
    public snackBar: MatSnackBar
  ) { }

  private params: any;
  private inputActions: ActionsList[];
  private acoesType: ActionsListConstantes = new ActionsListConstantes();
  excluir: boolean;
  alterar: boolean;
  carrinho: boolean;
  copiarUUID: boolean;
  sincronizar: boolean;

  agInit(params: any): void {
    this.params = params;
    this.inputActions = this.params.context.componentParent.inputActions ? this.params.context.componentParent.inputActions : [];
    if (this.params.context.componentParent.inputActions) {
      this.alterar = this.inputActions.some(opc => {
        return opc.acao == this.acoesType.alterar;
      });
      this.excluir = this.inputActions.some(opc => {
        return opc.acao == this.acoesType.excluir;
      });
      this.carrinho = this.inputActions.some(opc => {
        return opc.acao == this.acoesType.carrinho;
      });
      this.copiarUUID = this.inputActions.some(opc => {
        return opc.acao == this.acoesType.copiaruuid;
      });
      this.sincronizar = this.inputActions.some(opc => {
        return opc.acao == this.acoesType.sincronizar;
      });
    } else {
      // PADRÃO
      this.excluir = true;
      this.alterar = true;
      this.carrinho = false;
      this.copiarUUID = false;
      this.sincronizar = false
    }
  }

  public edit() {
    this.params.context.componentParent.edit(this.params.data);
  }

  public delete() {
    let deletarPermanentemente: boolean = true;

    const duration: number = 5000
    const deletar: string = this.params.data.email || this.params.data.nome
    const snackBarRef = this.messageService.add(`${deletar} será deletado(a) em ${duration / 1000}s`, duration, 'Cancelar')

    snackBarRef.onAction().subscribe(() => {
      deletarPermanentemente = false
      this.messageService.add('Cancelado', 2500, 'Ufa!')
    });

    setTimeout(() => {
      if (deletarPermanentemente) return this.params.context.componentParent.delete(this.params.data);
    }, duration + 200);
  }

  public addCart() {
    this.params.context.componentParent.addCart(this.params.data);
  }

  public copyUuid() {
    const uuid = this.params.data.uuid
    const selBox = document.createElement('input');
    selBox.value = uuid;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.utils.emitirMensagem(`UUID ${this.params.data.nome} copiado para a área de transferência`)
  }

  public sincronizarOrganizacao() {
    this.organizacaoService.getStatusSync(this.params.data, false)
    // .subscribe(statusSync => { },
    //   error => {
    //     this.utils.emitirMensagem('Erro ao sincronizar Erro:' + error.message || error)
    //     console.log('erro:', error)
    //   });

    if (!this.params.data.ativo) {
      return this.utils.emitirMensagem('Não é permitido sincronizar uma organização inativa')
    }
    // else if (this.params.data.sincronizando) {
    //   return this.utils.emitirMensagem('Não é permitido sincronizar uma organização mais de uma vez')
    // }
    this.disabled = true
    this.organizacaoService.sincronizarDados(this.params.data, false)
      .subscribe(sync => {
        if (sync) this.disabled = false
      },
        erro => {
          this.utils.emitirMensagem(`Erro ao sincronizar ${this.params.data.nome.toUpperCase()} Erro: ${erro.message || erro}`)
          console.log('erro:', erro)
        });
  }

  refresh(): boolean {
    return false;
  }

}
