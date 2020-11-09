// This file can be replaced during build by using the `fileReplacements` array.
// ^ `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { api } from './environment.api'

// * Define qual API será consumida
const curriculum_api: string = api.localhost;

// ! ------------------------------------------------------------------------------//
// ^ Verifica se "está" em produção
const production: boolean = curriculum_api === api.production

export const environment = {
  production,
  curriculum_api
};

/*
  Para depuração mais fácil no modo de desenvolvimento, você pode importar o seguinte arquivo
  para ignorar frames de pilha de erros relacionados à zona, como `zone.run`,` zoneDelegate.invokeTask`.

  Esta importação deve ser comentada no modo de produção porque terá um impacto negativo
  no desempenho se um erro for lançado.
 */
// ? import 'zone.js/dist/zone-error';  // Included with Angular CLI.
