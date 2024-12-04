import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICliente } from '../interfaces/ICliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.apiUrl);
  }
}
