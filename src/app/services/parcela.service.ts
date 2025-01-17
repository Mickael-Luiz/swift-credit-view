import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IParcela } from '../interfaces/IParcela';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService {

  private apiUrl = `${environment.apiUrl}/parcelas`

  constructor(private http: HttpClient) { }

  listarParcelasPorEmprestimoId(emprestimoId: number): Observable<IParcela[]> {
    return this.http.get<IParcela[]>(`${this.apiUrl}?emprestimoId=${emprestimoId}`)
  }
}
