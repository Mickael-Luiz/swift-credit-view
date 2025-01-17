export interface IParcela {
  id: number
  emprestimoId: number
  numeroParcela: number
  dataVencimento: string
  valorOriginal: number
  valorAtual: number
  valorPago: number
  dataPagamento: string
  status: string
  jurosAtraso: number
  valorFaltante: number
}