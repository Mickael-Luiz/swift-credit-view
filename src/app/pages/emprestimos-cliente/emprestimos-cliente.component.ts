import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IClienteDropdownDTO } from '../../interfaces/ICliente';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { EmprestimoService } from '../../services/emprestimo.service';
import { IEmprestimo, IEmprestimoResponse } from '../../interfaces/IEmprestimo';
import { StatusParcelaColorPipe } from '../../pipes/status-parcela-color.pipe';
import { DataLocPipe } from '../../pipes/dataLOC.pipe';

@Component({
  selector: 'app-emprestimos-cliente',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    AutoCompleteModule,
    ToastModule,
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    TableModule,
    StatusParcelaColorPipe,
    DataLocPipe
  ],
  providers: [MessageService],
  templateUrl: './emprestimos-cliente.component.html',
  styleUrl: './emprestimos-cliente.component.scss'
})
export class EmprestimosClienteComponent {

  clienteId!: number;
  nomeCliente: string = '';
  dialogForm: boolean = false;
  dialogEdit: boolean = false
  editandoEmprestimo: boolean = false
  formEmprestimo!: FormGroup;

  emprestimos: IEmprestimoResponse[] = []
  emprestimoSelecionado: IEmprestimoResponse | null = null
  listaClientesDropdown: IClienteDropdownDTO[] = [];
  listaClientesDropdownFiltrados: IClienteDropdownDTO[] = [];
  emprestimoCalculado: any = []

  idEmprestimoEditando: number | null = null

  rows: number = 10
  page: number = 0

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private emprestimoService: EmprestimoService
  ) {
    this.criarForms()
  }

  ngOnInit() {
    this.clienteId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.clienteId && this.buscarCliente();
    this.buscarEmprestimosPaginado()
  }

  criarForms() {
    this.formEmprestimo = this.fb.group({
      cliente: this.clienteId,
      valorEmprestimo: [null, Validators.required],
      juros: [null, Validators.required],
      totalParcelas: [null, Validators.required],
      valorParcela: [null],
      jurosParcela: [null],
      jurosTotal: [null],
      valorTotal: [null]
    });
  }

  buscarCliente() {
    if (this.clienteId) {
      this.clienteService.buscarClientePorId(this.clienteId).subscribe({
        next: (data) => {
          this.nomeCliente = data.nome;
        }
      });
    }
  }

  buscarTodosClientes() {
    this.clienteService.buscarListaClientes().subscribe({
      next: (data) => {
        this.listaClientesDropdown = data
      },
      error: (err) => {
        this.messageService.add({ severity: 'danger', summary: 'Falha', detail: 'Erro ao carregar lista de clientes' });
      }
    })
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

  abrirDialogForm() {
    this.dialogForm = true;
    this.buscarTodosClientes()
  }

  abrirDialogEdit(id: number) {
    this.dialogEdit = true;
    this.emprestimoSelecionado = this.emprestimos.find(emp => emp.id == id) || null
    this.montarFormEdicao()
  }

  fecharDialogForm() {
    this.dialogForm = false;
    this.formEmprestimo.reset();
    this.listaClientesDropdown = [];
    this.emprestimoCalculado = [];
  }

  fecharDialogEdit() {
    this.dialogEdit = false
    this.formEmprestimo.reset();
    this.emprestimoCalculado = [];
  }

  montarFormEdicao() {
    this.formEmprestimo.patchValue({
      cliente: this.clienteId,
      valorEmprestimo: this.emprestimoSelecionado?.valorEmprestado,
      juros: this.emprestimoSelecionado?.taxaJuros,
      totalParcelas: this.emprestimoSelecionado?.totalParcelas
    });
    this.calcular()
  }

  calcular() {
    if (!this.formEmprestimo.valid) {
      this.messageService.add({ severity: 'info', summary: 'Falha ao Calcular', detail: 'Preencha todos os campos para calcular' });
      return;
    }
    this.emprestimoCalculado = []
    const quantidadeParcelas = parseFloat(this.formEmprestimo.value.totalParcelas);
    const juros = this.formEmprestimo.value.juros / 100;
    const valorEmprestado = parseFloat(this.formEmprestimo.value.valorEmprestimo);
    const jurosParcela = parseFloat((valorEmprestado * juros).toFixed(2));
    const valorParcela = parseFloat((valorEmprestado / quantidadeParcelas + jurosParcela).toFixed(2));
    const jurosTotal = parseFloat((jurosParcela * quantidadeParcelas).toFixed(2));
    const valorTotal = parseFloat((valorEmprestado + jurosTotal).toFixed(2));
    this.formEmprestimo.get('jurosParcela')?.setValue(jurosParcela);
    this.formEmprestimo.get('valorParcela')?.setValue(valorParcela);
    this.formEmprestimo.get('jurosTotal')?.setValue(jurosTotal);
    this.formEmprestimo.get('valorTotal')?.setValue(valorTotal);
    this.emprestimoCalculado.push(this.formEmprestimo.value);
  }

  atribuirPagamento() {

  }

  buscarEmprestimosPaginado(filtro?: string) {
    this.emprestimoService.listarEmprestimos(this.clienteId).subscribe({
      next: (data) => {
        this.emprestimos = data;
      }
    })
  }

  salvarEmprestimo() {
    if (this.formEmprestimo.valid && this.formEmprestimo.value.valorTotal) {
      if (!this.idEmprestimoEditando) {
        const emprestimo = {
          id: this.formEmprestimo.value.id,
          clienteId: this.clienteId,
          valorEmprestado: this.formEmprestimo.value.valorEmprestimo,
          valorTotal: this.formEmprestimo.value.valorTotal,
          totalParcelas: this.formEmprestimo.value.totalParcelas,
          taxaJuros: this.formEmprestimo.value.juros
        }
        this.emprestimoService.salvarEmprestimo(emprestimo).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Concluído', detail: 'Emprestimo realizado com sucesso' });
            this.buscarEmprestimosPaginado()
            this.fecharDialogForm()
          }, error: err => {
            this.messageService.add({ severity: 'error', summary: 'Erro ao Salvar', detail: 'Não foi possível salvar o emprestimo' });
          }
        })
      }
    } else {
      if (!this.formEmprestimo.value.valorTotal) {
        this.messageService.add({ severity: 'error', summary: 'Observação', detail: 'Por favor, realize o cálculo antes de salvar' });
        return;
      }
      this.messageService.add({ severity: 'error', summary: 'Observação', detail: 'Por favor, preencha todos os campos obrigatórios' });
    }
  }

}
