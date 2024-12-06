import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICliente } from '../interfaces/ICliente';
import { IPage } from '../interfaces/IPage';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  getClientes(infoPage: any, filtro?: string): Observable<IPage<ICliente>> {
    const params = {
      page: infoPage.page || 0,
      size: infoPage.rows || 10,
      filtro: filtro || ''
    };
    return this.http.get<IPage<ICliente>>(`${this.apiUrl}/paginado?sort=${infoPage.sort || 'id,desc'}`, {params});
  }
}
