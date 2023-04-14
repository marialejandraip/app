import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { DoctorService } from './doctor.service';

describe('DoctorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [DoctorService]
  }));
  

  it('should be created', () => {
    const service: DoctorService = TestBed.get(DoctorService);
    expect(service).toBeTruthy();
   });

   it('should have getData function', () => {
    const service: DoctorService = TestBed.get(DoctorService);
    expect(service.buscarDoctor).toBeTruthy();
   });
});
