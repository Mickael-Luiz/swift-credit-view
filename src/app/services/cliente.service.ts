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

  getClientes(infoPage: any): Observable<IPage<ICliente>> {
    return this.http.get<IPage<ICliente>>(`${this.apiUrl}/paginado?page=${infoPage ? infoPage.page : 0}&size=${infoPage ? infoPage.rows : 10}&sort=id,desc`);
  }
}
