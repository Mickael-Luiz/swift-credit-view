import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { ICliente } from '../../interfaces/ICliente';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    HttpClientModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    TableModule,
    PaginatorModule
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent {

  clientes: ICliente[] = [];
  clientesSelecionados: ICliente[] = []
  niveisConfiabilidade = [
    { id: 1, desc: 'Baixa' },
    { id: 2, desc: 'Média' },
    { id: 3, desc: 'Alta' }
  ];

  first: number = 0;
  totalElements: number = 0;
  rows: number = 5;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientesPaginado()
  }

  getClientesPaginado(infoPage?: any) {
    console.log(infoPage);
    this.clienteService.getClientes(infoPage).subscribe((data) => {
      this.clientes = data.content;
      this.totalElements = data.totalElements;
    })
  }

}
