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
  recomendante: IClienteDTO,
}

export interface IClienteDTO {
  id: number,
  nome: string,
  telefone: string,
  confiabilidade: string
}

export interface IClienteDropdownDTO {
  id: number,
  nome: string
}