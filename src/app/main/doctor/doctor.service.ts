import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl: string = "http://localhost:5009/api/dictamenes";

  constructor(private readonly http: HttpClient) { }

  obtenerTiposDocumento() {
    return this.http.get(`${this.baseUrl}/tipodocumento`);
  }

  obtenerRegionesColombia() {
    return this.http.get(`${this.baseUrl}/regionescolombia`);
  }

  buscarDoctor(tipoDocumento: string, numeroDocumento: string) {
    return this.http.get(`${this.baseUrl}/doctor/${tipoDocumento}/${numeroDocumento}`);
  }

  buscarDoctorPorId(id: string) {
    return this.http.get(`${this.baseUrl}/doctor/${id}`);
  }
}
