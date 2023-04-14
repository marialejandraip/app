import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { DictamenComponent } from './dictamen/dictamen.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { DoctorComponent } from './doctor/doctor.component';
import { MockComponent } from 'ng-mocks';
import { MainComponent } from './main.component';
import { Dictamen } from '../models/dictamen';
import { Doctor } from '../models/doctor';

const mockDataDictamen: Dictamen = {
  consecutivo: 123,
  fechaRecepcion: new Date('Jul 12 2011'),
  motivo: 'consulta',
  estado: true
}

const mockDataDoctor: Doctor = {
    primerNombre: 'Pepito',
    primerApellido: 'Perez',
    tipoDocumento: 'Cedula',
    numeroDocumento: '1423424353',
    rol: 'internista',
    direccion: 'calle falsa 123',
    ciudad: 'Cali',
    departamento: 'Valle',
    pais: 'Colombia',
    estado: true
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [ 
        MainComponent,
        MockComponent(CabeceraComponent),
        MockComponent(DictamenComponent),
        MockComponent(DoctorComponent),
        MockComponent(PacienteComponent),
        MockComponent(ResultadosComponent)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the main component in app', () => {
    expect(component).toBeTruthy();
  });

  it('should set the dictamen property of historiaClinica and the dictamen property of this to the estado property of the input dictamen', () => {
    // arrange
    const dictamen: Dictamen = mockDataDictamen;
    const mainComponentTemplate = new MainComponent(); // create an instance of the class that contains obtenerDictamen

    // act
    mainComponentTemplate.obtenerDictamen(dictamen);

    // assert
    expect(mainComponentTemplate.historiaClinica.dictamen).toEqual(dictamen);
    expect(mainComponentTemplate.dictamen).toEqual(dictamen.estado);
  });

  it('should set the doctor property of historiaClinica and the doctor property of this to the estado property of the input doctor', () => {
    // arrange
    const doctor: Doctor = mockDataDoctor;
    const mainComponentTemplate = new MainComponent(); // create an instance of the class that contains obtenerDoctor

    // act
    mainComponentTemplate.obtenerDoctor(doctor);

    // assert
    expect(mainComponentTemplate.historiaClinica.doctor).toEqual(doctor);
    expect(mainComponentTemplate.doctor).toEqual(doctor.estado);
  });
});

