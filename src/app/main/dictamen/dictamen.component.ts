import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dictamen } from '../../models/dictamen';
import { Doctor } from '../../models/doctor';
import { Paciente } from '../../models/paciente';
import { HistoriaClinica } from '../../models/historiaClinica';

import { DoctorService } from '../doctor/doctor.service';
import { PacienteService } from '../paciente/paciente.service';
import { DictamenService } from './dictamen.service';

@Component({
  selector: 'dictamen',
  templateUrl: './dictamen.component.html',
  styleUrls: ['./dictamen.component.css']
})
export class DictamenComponent implements OnInit, OnDestroy {

  @Output()
  resultado: EventEmitter<Dictamen> = new EventEmitter<Dictamen>();

  @Output()
  busqueda: EventEmitter<HistoriaClinica> = new EventEmitter<HistoriaClinica>();

  ultimoDictamen: number = 0;
  estado: string = '* Sin guardar *';
  fechaRecepcion: string = '';

  form: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly dictamenService: DictamenService,
    private readonly doctorService: DoctorService,
    private readonly pacienteService: PacienteService) {
    this.form = fb.group({
      numeroDictamen: [''],
      fechaRecepcion: ['', Validators.required],
      fechaValoracion: [''],
      motivoCalificacion: ['Pérdida de la capacidad laboral'],
      guardar: ['']
    });
  }

  ngOnInit(): void {
    this.form.get('numeroDictamen')?.disable();
    this.form.get('motivoCalificacion')?.disable();
    this.form.get('guardar')?.enable();

    this.form.valueChanges.subscribe(() => {
      this.estado = '* Sin guardar *';

      let dictamen: Dictamen = <Dictamen>{
        consecutivo: this.form.get('numeroDictamen')?.value.toString().toUpperCase(),
        fechaRecepcion: this.form.get('fechaRecepcion')?.value.toString().toUpperCase(),
        fechaValoracion: this.form.get('fechaValoracion')?.value.toString().toUpperCase(),
        motivo: this.form.get('motivoCalificacion')?.value.toString().toUpperCase(),
        estado: false
      };

      this.resultado.emit(dictamen);
    });

    this.form.get('fechaRecepcion')?.valueChanges.subscribe((date: any) => {
      this.fechaRecepcion = date;
      if (new Date(date) > new Date(this.obtenerHoy())) {
        this.fechaRecepcion = this.obtenerHoy();
        this.form.get('fechaRecepcion')?.setValue(this.obtenerHoy());
      }
    });

    this.dictamenService.obtenerUltimoDictamen()
      .subscribe((dictamen: any) => {
        let consecutivo: number = dictamen.payload[0].consecutivo;
        consecutivo = consecutivo + 1;
        this.ultimoDictamen = consecutivo;
        this.form.get('numeroDictamen')?.setValue(this.agregarCeros(consecutivo, 10));
      })
  }

  ngOnDestroy(): void {
    this.labels = {
      titulo: "",
      dictamen: "",
      fechaRecepcion: "",
      fechaValoracion: "",
      motivoCalificacion: "",
      guardar: ""
    };
  }

  obtenerHoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  obtenerFechaRecepcion(): string {
    return this.fechaRecepcion;
  }

  editar(evt: any): void {
    if (this.form.get('numeroDictamen')?.disabled) {
      this.form.get('numeroDictamen')?.enable();
      this.form.get('guardar')?.enable();
    } else {
      this.form.get('numeroDictamen')?.disable();
      this.form.get('guardar')?.disable();
    }
    this.form.get('numeroDictamen')?.updateValueAndValidity();
    this.form.get('guardar')?.updateValueAndValidity();
  }

  buscar(evt: any): void {
    let dictamen = this.form.get('numeroDictamen')?.value;
    if (Number.parseInt(dictamen) > this.ultimoDictamen) {
      alert('El dictamen a buscar debe ser menor a ' + this.ultimoDictamen.toString());
    } else {
      this.dictamenService.buscarDictamen(dictamen)
        .subscribe((_dictamen: any) => {
          if (_dictamen.payload.length > 0) {
            let datos = _dictamen.payload[0];

            let dictamen: Dictamen = <Dictamen>{
              consecutivo: datos.consecutivo,
              fechaRecepcion: datos.fechaRecepcion,
              fechaValoracion: datos.fechaValoracion,
              motivo: datos.motivo,
              estado: false
            };

            this.form.get('numeroDictamen')?.setValue(this.agregarCeros(dictamen.consecutivo, 10));
            this.form.get('fechaRecepcion')?.setValue(new Date(dictamen.fechaRecepcion).toISOString().slice(0, 10));
            this.form.get('fechaValoracion')?.setValue(new Date(dictamen.fechaValoracion ? dictamen.fechaValoracion : '').toISOString().slice(0, 10));
            this.form.get('motivoCalificacion')?.setValue(this.CambiarMayusculaPrimeraLetra(dictamen.motivo));
            this.estado = '';

            let doctorId = datos.doctorid;
            let pacienteId = datos.pacienteid;

            let doctor: Doctor = <Doctor>{};
            let paciente: Paciente = <Paciente>{};

            this.doctorService.buscarDoctorPorId(doctorId)
              .subscribe((_doctor: any) => {
                let datos = _doctor.payload[0];

                doctor = {
                  primerNombre: datos.primerNombre,
                  segundoNombre: datos.segundoNombre,
                  primerApellido: datos.primerApellido,
                  segundoApellido: datos.segundoApellido,
                  tipoDocumento: datos.tipoDocumento,
                  numeroDocumento: datos.numeroDocumento,
                  rol: datos.rol,
                  direccion: datos.direccionResidencia,
                  ciudad: datos.ciudadResidencia,
                  departamento: datos.departamentoResidencia,
                  pais: datos.paisResidencia,
                  telefono: datos.telefono,
                  correoElectronico: datos.correoElectronico,
                  estado: false
                };

                this.pacienteService.buscarPacientePorId(pacienteId)
                  .subscribe((_paciente: any) => {
                    let datos = _paciente.payload[0];

                    paciente = {
                      primerNombre: datos.primerNombre,
                      segundoNombre: datos.segundoNombre,
                      primerApellido: datos.primerApellido,
                      segundoApellido: datos.segundoApellido,
                      tipoDocumento: datos.tipoDocumento,
                      numeroDocumento: datos.numeroDocumento,
                      genero: datos.genero,
                      estadoCivil: datos.estadoCivil,
                      fechaNacimiento: datos.fechaNacimiento,
                      ciudadNacimiento: datos.ciudadNacimiento,
                      departamentoNacimiento: datos.departamentoNacimiento,
                      paisNacimiento: datos.paisNacimiento,
                      direccionResidencia: datos.direccionResidencia,
                      ciudadResidencia: datos.ciudadResidencia,
                      departamentoResidencia: datos.departamentoResidencia,
                      paisResidencia: datos.paisResidencia,
                      telefono: datos.telefono,
                      correoElectronico: datos.correoElectronico,
                      nivelEscolaridad: datos.nivelEscolaridad,
                      profesionOficio: datos.profesionOficio,
                      arl: datos.arl,
                      eps: datos.eps,
                      afp: datos.afp,
                      estado: false
                    };

                    let historiaClinica: HistoriaClinica = <HistoriaClinica>{
                      dictamen: dictamen,
                      doctor: doctor,
                      paciente: paciente
                    };
    
                    this.busqueda.emit(historiaClinica);
                  });                
              });
          } else {
            alert('Dictamen no encontrado');
          }
        });
    }
  }

  guardar(evt: any): void {
    let dictamen: Dictamen = <Dictamen>{
      consecutivo: this.form.get('numeroDictamen')?.value.toString().toUpperCase(),
      fechaRecepcion: this.form.get('fechaRecepcion')?.value.toString().toUpperCase(),
      fechaValoracion: this.form.get('fechaValoracion')?.value.toString().toUpperCase(),
      motivo: this.form.get('motivoCalificacion')?.value.toString().toUpperCase(),
      estado: true
    };

    this.resultado.emit(dictamen);
    this.estado = '';
  }

  private agregarCeros(num: number, len: number): string {
    return String(num).padStart(len, '0');
  }

  private CambiarMayusculaCadaPalabra(str: string): string {
    let palabras: string[] = str.split(' ');
    for (let i = 0; i < palabras.length; i++) {
      if (palabras[i] != '') {
        palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substring(1).toLowerCase();
      }
    }
    return palabras.join(' ');
  }

  private CambiarMayusculaPrimeraLetra(str: string) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  }

  labels = {
    titulo: "Datos generales del dictamen",
    dictamen: "Dictamen",
    fechaRecepcion: "Fecha de recepción",
    fechaValoracion: "Fecha de valoración",
    motivoCalificacion: "Motivo de la calificación",
    guardar: "Guardar"
  };
}