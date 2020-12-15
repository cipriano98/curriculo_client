import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { MessagesService } from './messages/messages.service';

export interface size {
  width: string;
  height: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private messageService: MessagesService,
    public dialog: MatDialog
  ) { }

  public getSessao(atribute?: string): any {
    const currentUser = localStorage.getItem('currentUser')
    if(atribute && currentUser) {
      return JSON.parse(currentUser)[atribute]
    }
    if (currentUser) {
      return JSON.parse(currentUser)
    }
    return ''
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  handleError<T>(operation = 'operação', result?: T) {
    return (error: any): Observable<T> => {
      // console.log(error)
      if (error === `Http failure response for (unknown url): 0 Unknown ${'Error' || 'message'}`) {
        error = 'Ocorreu um erro, tente novamente mais tarde';
      }
      console.log(`${operation} failed: ${error}`);

      if (error) {
        this.messageService.add(error, 10000);
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  emitirErrosSubmit(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      // Adicionada recursividade para grupos filhos
      if (controle instanceof FormGroup) {
        this.emitirErrosSubmit(controle);
      }
    });
    this.messageService.add('Ajuste os erros no formulário e tente novamente.');
  }

  sendMessage(mensagem: string, duration?: number, action?: string) {
    return this.messageService.add(mensagem, duration, action);
  }

  openEditModal(componente: any, id: number, config?: MatDialogConfig): void {
    const configuration = config || {
      maxWidth: '1200px',
      width: '90%',
      maxHeight: '750px',
      height: '90%',
      data: { idEdicao: id }
    }
    const dialogRef = this.dialog.open(componente, configuration);
  }
  
  getLanguage() {
    return navigator.language || 'en'
  }

}
