import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictamenService {

  private baseUrl: string = "http://localhost:5009/api/dictamenes";

  constructor(private readonly http: HttpClient) { }

  obtenerUltimoDictamen() {
    return this.http.get(`${this.baseUrl}`);
  }

  buscarDictamen(dictamen: string) {
    return this.http.get(`${this.baseUrl}/consecutivo/${dictamen}`);
  }
}
