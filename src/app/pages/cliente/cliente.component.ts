import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { ICliente } from '../../interfaces/ICliente';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent {

  clientes: ICliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
    })
  }

}
