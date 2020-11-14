
export interface ActionsList {
    acao: string
}
export enum ActionsListTypes {
  ALTERAR = 'ALTERAR',
  EXCLUIR = 'EXCLUIR',
  CARRINHO = 'CARRINHO',
  COPIARUUID = 'COPIARUUID',
  SINCRONIZAR = 'SINCRONIZAR'
}

export class ActionsListConstantes {
  alterar: string = ActionsListTypes.ALTERAR;
  excluir: string = ActionsListTypes.EXCLUIR;
  carrinho: string = ActionsListTypes.CARRINHO;
  copiaruuid: string = ActionsListTypes.COPIARUUID;
  sincronizar: string = ActionsListTypes.SINCRONIZAR;
}
