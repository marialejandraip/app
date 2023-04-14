import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HistoriaClinica } from '../../models/historiaClinica';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  private baseUrl: string = "http://localhost:5009/api/dictamenes";

  constructor(private readonly http: HttpClient) { }

  guardarDictamen(historiaClinica: HistoriaClinica) {
    return this.http.post(`${this.baseUrl}/`, historiaClinica);
  }
}
