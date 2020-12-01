import { Component } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ICellRendererAngularComp } from 'ag-grid-angular'

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
  excluir: boolean = false
  alterar: boolean = false

  agInit(params: any): void {
    this.params = params
    this.excluir = true
    this.alterar = true
  }

  public edit() {
    this.params.context.componentParent.edit(this.params.data.id);
  }

  public delete() {
    let permanentlyDelete: boolean = true;

    const duration: number = 5000
    const deletar: string = this.params.data.preferencialname || this.params.data.name
    const snackBarRef = this.messageService.add(`${deletar} será deletado(a) em ${duration / 1000}s`, duration, 'Cancelar')

    snackBarRef.onAction().subscribe(() => {
      permanentlyDelete = false
      this.messageService.add('Cancelado', 2500, 'Ufa!')
    });

    setTimeout(() => {
      if (permanentlyDelete) return this.params.context.componentParent.delete(this.params.data.id);
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
    this.utils.sendMessage(`UUID ${this.params.data.preferencialname || this.params.data.name} copiado para a área de transferência`)
  }

  refresh(): boolean {
    return true;
  }

}
