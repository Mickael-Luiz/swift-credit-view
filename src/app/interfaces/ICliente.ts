export interface ICliente {
  id: number,
  nome: string,
  telefone: string,
  endereco: string,
  bairro: string,
  cidade: string,
  complemento: string,
  numero: string,
  confiabilidade: string,
  recomendante: number,
  debito: number
}

export interface IClienteDTO {
  id: number,
  nome: string,
  telefone: string,
  confiabilidade: string,
  debito: number
}