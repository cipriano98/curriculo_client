const port: number = 3000

export const api = {
  production: `https://curriculo-unico.herokuapp.com/api/v1`,
  localhost: `http://localhost:${port}/api/v1`,
  // test: `http://localhost:3017/api/v1`
  test: `http://zeta08.primusweb.com.br:3011/api/v1`
};

// * Define qual API será consumida
const curriculumApi: string = api.test;

// ^ Verifica se "está" em produção
const production: boolean = curriculumApi === api.production

export const environment = {
  production,
  curriculumApi,
};