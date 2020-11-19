import { Component } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ICellRendererAngularComp } from 'ag-grid-angular'

import { ActionsList, ActionsListConstantes } from './constants/actionsList'
import { MessagesService } from '../messages/messages.service'
import { UtilService } from '../utils.service'

@Component({
  selector: 'app-botoes-grid',
  templateUrl: './botoes-grid.component.html',
  styleUrls: ['./botoes-grid.component.scss']
})
export class BotoesGridComponent implements ICellRendererAngularComp {

  constructor(
    private utils: UtilService,
    private messageService: MessagesService,
    public snackBar: MatSnackBar
  ) { }

  private params: any
  private inputActions: ActionsList[]
  private acoesType: ActionsListConstantes = new ActionsListConstantes()
  excluir: boolean
  alterar: boolean

  agInit(params: any): void {
    this.params = params
    this.inputActions = this.params.context.componentParent.inputActions ? this.params.context.componentParent.inputActions : []

    if (this.params.context.componentParent.inputActions) {
      this.alterar = this.inputActions.some(opc => {
        return opc.acao == this.acoesType.alterar
      });
      this.excluir = this.inputActions.some(opc => {
        return opc.acao == this.acoesType.excluir
      });
    } else {
      this.excluir = true
      this.alterar = true
    }
  }

  public edit() {
    this.params.context.componentParent.edit(this.params.data);
  }

  public delete() {
    let deletarPermanentemente: boolean = true;

    const duration: number = 5000
    const deletar: string = this.params.data.preferencialname || this.params.data.nome
    const snackBarRef = this.messageService.add(`${deletar} será deletado(a) em ${duration / 1000}s`, duration, 'Cancelar')

    snackBarRef.onAction().subscribe(() => {
      deletarPermanentemente = false
      this.messageService.add('Cancelado', 2500, 'Ufa!')
    });

    setTimeout(() => {
      if (deletarPermanentemente) return this.params.context.componentParent.delete(this.params.data);
    }, duration + 200);
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

  refresh(): boolean {
    return true;
  }

}
