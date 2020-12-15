export interface Address {
  name?: string,
  cep?: string,
  logradouro?: string,
  bairro?: string,
  cidade?: string,
  state?: string,
}

export interface AddressFixed {
  name?: string,
  zipcode?: string,
  publicplace?: string,
  neighborhood?: string, // || district?: string,
  city?: string,
  state?: string,
}


