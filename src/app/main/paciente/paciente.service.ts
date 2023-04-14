import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private baseUrl: string = "http://localhost:5009/api/dictamenes";

  constructor(private readonly http: HttpClient) { }

  obtenerTiposDocumento() {
    return this.http.get(`${this.baseUrl}/tipodocumento`);
  }

  obtenerRegionesColombia() {
    return this.http.get(`${this.baseUrl}/regionescolombia`);
  }

  obtenerGeneros() {
    return this.http.get(`${this.baseUrl}/generossexuales`);
  }

  obtenerEstadosCiviles() {
    return this.http.get(`${this.baseUrl}/estadosciviles`);
  }

  obtenerNivelesEscolaridad() {
    return this.http.get(`${this.baseUrl}/nivelescolaridad`);
  }

  obtenerEpss() {
    return this.http.get(`${this.baseUrl}/epss`);
  }

  obtenerArls() {
    return this.http.get(`${this.baseUrl}/arls`);
  }

  obtenerAfps() {
    return this.http.get(`${this.baseUrl}/afps`);
  }

  buscarPaciente(tipoDocumento: string, numeroDocumento: string) {
    return this.http.get(`${this.baseUrl}/paciente/${tipoDocumento}/${numeroDocumento}`);
  }

  buscarPacientePorId(id: string) {
    return this.http.get(`${this.baseUrl}/paciente/${id}`);
  }
}
