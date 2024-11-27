import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseURL = 'http://localhost:8080/api/v1/clientes';

  constructor(private httpClient: HttpClient) { }

  obtenerListaEmpleados(): Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(`${this.baseURL}`);
  }

  obtenerEmpleadoPorId(id: number): Observable<Empleado>{
    return this.httpClient.get<Empleado>(`${this.baseURL}/${id}`);
  }

  registrarEmpleado(empleado: Empleado): Observable<Empleado>{
    return this.httpClient.post<Empleado>(`${this.baseURL}`, empleado);
  }

  actualizarEmpleado(id: number, empleado: Empleado): Observable<Empleado>{
    return this.httpClient.put<Empleado>(`${this.baseURL}/${id}`, empleado);
  }

  eliminarEmpleado(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseURL}/${id}`);
  }

}
