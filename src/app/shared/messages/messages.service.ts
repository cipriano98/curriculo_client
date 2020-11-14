import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MessagesService {

  messages: string[] = [];

  constructor(
    public snackBar: MatSnackBar
  ) { }

  add(message: string, duration?: number, action?: string) {
    return this.openSnackBar(message, action || 'Fechar', duration);
  }

  clear() {
    this.messages = [];
    this.snackBar.dismiss();
  }

  openSnackBar(message: string, action: string, duration?: number) {
    const snacBarRef = this.snackBar.open(message, action, {
      duration: duration || 3000,
      panelClass: ['message']
    });
    return snacBarRef
  }
}
