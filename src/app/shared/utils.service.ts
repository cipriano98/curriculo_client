import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Auth } from '../auth/auth';

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

  public getSessao(atribute?: string): Auth | string {
    const currentUser = localStorage.getItem('currentUser')
    if(atribute && currentUser) {
      return JSON.parse(currentUser)[atribute]
    }
    if (currentUser) {
      return JSON.parse(currentUser)
    }
    return ''
  }

  log(message: any) {
    console.log(message);
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
      this.log(`${operation} failed: ${error}`);

      if (error) {
        this.messageService.add(error, 10000);
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  dateToString(date: Date): string {
    if (!date) return null;
    date = new Date(date);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateFormat = date.toLocaleDateString('pt-BR', options);
    const dia = dateFormat.slice(0, 2);
    const mes = dateFormat.slice(3, 5);
    const ano = dateFormat.slice(6, 10);
    const hora = dateFormat.slice(11, 13);
    const minuto = dateFormat.slice(14, 16);
    const segundo = dateFormat.slice(17, 19);
    const dateStr = ano + '-' + mes + '-' + dia + 'T' + hora + ':' + minuto + ':' + segundo;
    return dateStr;
  }

  todayString(): string {
    const now = new Date();
    return this.dateToString(now);
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

  openEditModal(componente: any, id: number, size: size = { width: '99,9%', height: '77%' }): void {
    const dialogRef = this.dialog.open(componente, {
      width: size.width,
      height: size.height,
      data: { idEdicao: id }
    });
  }

  formatarCpfOuCnpj(cpfOuCnpj) {
    const numbers = cpfOuCnpj.match(/\d/g);
    let numberLength = 0;
    if (numbers) {
      numberLength = numbers.join('').length;
    }
    if (numberLength === 11) {
      return cpfOuCnpj.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    } else if (numberLength === 14) {
      return cpfOuCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  }

  getLanguage() {
    return navigator.language || 'en'
  }

}
