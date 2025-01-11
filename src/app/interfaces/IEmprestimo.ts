import { ICliente } from "./ICliente"

export interface IEmprestimo {
  id: number,
  clienteId: number,
  valorEmprestado: number,
  valorTotal: number,
  totalParcelas: number,
  saldoDevedor: number,
  dataContratacao: string,
  taxaJuros: number,
  status: string
}

export interface IEmprestimoResponse {
  id: number,
  cliente: ICliente,
  valorEmprestado: number,
  valorTotal: number,
  totalParcelas: number,
  saldoDevedor: number,
  dataContratacao: string,
  taxaJuros: number,
  status: string
}

export interface IEmprestimoNovo {
  id: number,
  clienteId: number,
  valorEmprestado: number,
  valorTotal: number,
  totalParcelas: number,
  taxaJuros: number,
}