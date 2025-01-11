import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPage } from '../interfaces/IPage';
import { IEmprestimo, IEmprestimoNovo, IEmprestimoResponse } from '../interfaces/IEmprestimo';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  private apiUrl = `${environment.apiUrl}/emprestimos`;

  constructor(private http: HttpClient) {}

  listarEmprestimos(clienteId: number): Observable<IEmprestimoResponse[]> {
    return this.http.get<IEmprestimoResponse[]>(`${this.apiUrl}?${clienteId}`);
  }

  buscarPorId(emprestimoId: number): Observable<IEmprestimoResponse> {
    return this.http.get<IEmprestimoResponse>(`${this.apiUrl}/${emprestimoId}`);
  }

  salvarEmprestimo(emprestimo: IEmprestimoNovo) {
    return this.http.post<IEmprestimo>(this.apiUrl, emprestimo);
  }

}
