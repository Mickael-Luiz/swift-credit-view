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
    TableModule
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent {

  clientes: ICliente[] = [];
  clientesSelecionados: ICliente[] = []
  niveisConfiabilidade = [
    {id: 1, desc: 'Baixa'},
    {id: 2, desc: 'Média'},
    {id: 3, desc: 'Alta'}
  ];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
    })
  }

}
