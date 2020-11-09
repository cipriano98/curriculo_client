interface Api {
  production: any
  localhost: any
}

const port: number = 3000

export const api: Api = {
  production: `https://curriculo-unico.herokuapp.com/api/v1`,
  localhost: `http://localhost:${port}/api/v1`,
};
