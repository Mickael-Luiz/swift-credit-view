import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { ICliente, IClienteDropdownDTO } from '../../interfaces/ICliente';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { PhonePipe } from '../../pipes/phone.pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    DialogModule,
    FloatLabelModule,
    InputMaskModule,
    AutoCompleteModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent {

  clientes: ICliente[] = [];
  listaClientesDropdown: IClienteDropdownDTO[] = [];
  listaClientesDropdownFiltrados: IClienteDropdownDTO[] = [];
  clientesSelecionados: ICliente[] = [];
  niveisConfiabilidade = [
    { id: 1, desc: 'Baixa' },
    { id: 2, desc: 'Média' },
    { id: 3, desc: 'Alta' }
  ];
  totalElements: number = 0;
  rows: number = 10;
  page: number = 0;
  formFiltro!: FormGroup;
  dialogFormCliente: boolean = false;
  titleDialog: string = '';
  formCliente!: FormGroup;
  idClienteEditando: number | null = null



  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.startFormFiltro()
    this.startFormCliente()
    this.buscarClientesPaginado()
  }

  startFormFiltro() {
    this.formFiltro = this.fb.group({
      search: ['']
    })
  }

  startFormCliente() {
    this.formCliente = this.fb.group({
      id: null,
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      recomendante: [''],
      endereco: [''],
      cidade: [''],
      bairro: [''],
      numero: null,
      complemento: [''],
      confiabilidade: [4]
    })
  }

  changePaginator(event: any) {
    this.rows = event.rows;
    this.page = event.page
    this.buscarClientesPaginado(event)
  }

  limparFormFiltro() {
    this.formFiltro.get('search')?.setValue('')
    this.buscarClientesPaginado()
    this.listaClientesDropdown = []
  }

  abrirDialogClientes(id?: number) {
    this.titleDialog = 'Novo Cliente';
    this.dialogFormCliente = true;
    if (id) {
      this.titleDialog = 'Editando Cliente';
      this.buscarClientePorId(id);
      this.idClienteEditando = id;
    }
  }

  fecharDialogClientes() {
    this.dialogFormCliente = false
    this.formCliente.reset()
    this.idClienteEditando = null
  }

  filledStars(confiabilidade: number): number[] {
    return Array.from({ length: confiabilidade }, () => 0);
  }

  emptyStars(confiabilidade: number): number[] {
    return Array.from({ length: 5 - confiabilidade }, () => 0);
  }

  filterCountry(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.listaClientesDropdown as any[]).length; i++) {
      let cliente = (this.listaClientesDropdown as any[])[i];
      if (cliente.nome.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(cliente);
      }
    }

    this.listaClientesDropdownFiltrados = filtered;
  }

  buscarClientesPaginado(infoPage?: any) {
    infoPage = infoPage ? infoPage : { rows: this.rows, page: this.page, sort: 'id,desc' }
    this.clienteService.buscarClientesPaginado(infoPage, this.formFiltro.value.search).subscribe((data) => {
      this.clientes = data.content;
      this.totalElements = data.totalElements;
    })
  }

  buscarClientePorId(id: number) {
    this.clienteService.buscarClientePorId(id).subscribe((data) => {
      this.formCliente.patchValue({
        id: data.id,
        nome: data.nome,
        telefone: data.telefone,
        endereco: data.endereco,
        bairro: data.bairro,
        cidade: data.cidade,
        complemento: data.complemento,
        numero: data.numero,
        confiabilidade: data.confiabilidade,
        recomendante: data.recomendante
      })
    })
  }

  prepararCamposForm() {
    this.formCliente.get('telefone')?.setValue(this.formCliente.value.telefone.replace(/\D/g, ''));
  }

  salvarCliente() {
    this.prepararCamposForm();
    if (this.formCliente.valid) {
      if (!this.idClienteEditando) {
        this.clienteService.salvarCliente(this.formCliente.value).subscribe({
          next: () => {
            this.buscarClientesPaginado();
            this.fecharDialogClientes();
            this.messageService.add({ severity: 'success', summary: 'Concluído', detail: 'Cliente salvo com sucesso' });
          },
          error: err => {
            this.messageService.add({ severity: 'danger', summary: 'Falha', detail: 'Erro ao salvar cliente' });
          }
        })
        return;
      } else {
        this.confirmationService.confirm({
          message: 'Deseja Salvar as Alterações do Cliente?',
          header: 'Confirmação',
          accept: () => {
            this.clienteService.salvarCliente(this.formCliente.value).subscribe({
              next: () => {
                this.buscarClientesPaginado();
                this.fecharDialogClientes();
                this.messageService.add({ severity: 'success', summary: 'Concluído', detail: 'Cliente salvo com sucesso' });
              },
              error: err => {
                this.messageService.add({ severity: 'danger', summary: 'Falha', detail: 'Erro ao salvar cliente' });
              }
            })
          }
        });
      }
    } else {
      this.messageService.add({ severity: 'danger', summary: 'Observação', detail: 'Por favor, preencha todos os campos obrigatórios' });
    }
  }
  
  deletarCliente(id: number, nome: string) {
    this.confirmationService.confirm({
      message: 'Deseja Deletar o Cliente '+nome+'?',
      header: 'Confirmação',
      accept: () => {
        this.clienteService.deletarCliente(id).subscribe({
          next: () => {
            this.buscarClientesPaginado();
            this.messageService.add({ severity: 'success', summary: 'Concluído', detail: 'Cliente ' + nome + ' deletado com sucesso' });
          },
          error: (err) => {
            this.messageService.add({ severity: 'danger', summary: 'Falha', detail: 'Falha ao deletar o cliente ' + nome });
          }
        })
      },
      reject: () => {
        return;
      }
    })
  }

}
