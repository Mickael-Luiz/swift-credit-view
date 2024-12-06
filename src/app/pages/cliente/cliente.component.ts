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
import { PhonePipe } from '../../pipes/phone.pipe';
import { ConfiabilidadeColorPipe } from '../../pipes/confiabilidade-color.pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    TableModule,
    PaginatorModule,
    PhonePipe,
    ConfiabilidadeColorPipe
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

  formFiltro!: FormGroup

  totalElements: number = 0;
  rows: number = 10;
  page: number = 0;




  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.startFormFiltro()
    this.getClientesPaginado()
  }

  
  changePaginator(event: any) {
    this.rows = event.rows;
    this.page = event.page
    this.getClientesPaginado(event)
  }
  
  getClientesPaginado(infoPage?: any) {
    infoPage = infoPage ? infoPage : {rows: this.rows, page: this.page, sort: 'id,desc'}
    this.clienteService.getClientes(infoPage, this.formFiltro.value.search).subscribe((data) => {
      this.clientes = data.content;
      this.totalElements = data.totalElements;
    })
  }
  
  startFormFiltro() {
    this.formFiltro = this.fb.group({
      search: ['']
    })
  }
  
  limparFormFiltro() {
    this.formFiltro.get('search')?.setValue('')
    this.getClientesPaginado()
  }

}
