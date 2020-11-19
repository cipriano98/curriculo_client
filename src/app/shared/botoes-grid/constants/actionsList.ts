
export interface ActionsList {
    acao: string
}
export enum ActionsListTypes {
  ALTERAR = 'ALTERAR',
  EXCLUIR = 'EXCLUIR',
}

export class ActionsListConstantes {
  alterar: string = ActionsListTypes.ALTERAR;
  excluir: string = ActionsListTypes.EXCLUIR;
}
