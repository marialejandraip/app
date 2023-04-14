import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PacienteService } from './paciente.service';

describe('PacienteService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [PacienteService]
  }));
  

  it('should be created', () => {
    const service: PacienteService = TestBed.get(PacienteService);
    expect(service).toBeTruthy();
   });

   it('should have getData function', () => {
    const service: PacienteService = TestBed.get(PacienteService);
    expect(service.buscarPacientePorId).toBeTruthy();
   });

});
