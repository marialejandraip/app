import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Doctor } from '../../models/doctor';

import { DoctorService } from './doctor.service';

@Component({
  selector: 'doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  busqueda: Doctor = <Doctor>{};

  @Output()
  resultado: EventEmitter<Doctor> = new EventEmitter<Doctor>();

  estado: string = '* Sin guardar *';

  tiposDocumento: any[] = [];
  regiones: any[] = [];
  departamentos: any[] = [];
  ciudades: any[] = [];

  form: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly doctorService: DoctorService) {
    this.form = fb.group({
      tipoDocumento: ['CC'],
      numeroDocumento: ['', Validators.required],
      cargo: ['', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      direccion: ['', Validators.required],
      pais: ['Colombia'],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.form.get("pais")?.disable();

    if (this.busqueda) {
      this.form.setValue(this.busqueda);
    }

    this.form.valueChanges.subscribe(() => {
      this.estado = '* Sin guardar *';

      let doctor: Doctor = <Doctor>{
        primerNombre: this.form.get('primerNombre')?.value.toString().toUpperCase(),
        segundoNombre: this.form.get('segundoNombre')?.value.toString().toUpperCase(),
        primerApellido: this.form.get('primerApellido')?.value.toString().toUpperCase(),
        segundoApellido: this.form.get('segundoApellido')?.value.toString().toUpperCase(),
        tipoDocumento: this.form.get('tipoDocumento')?.value.toString().toUpperCase(),
        numeroDocumento: this.form.get('numeroDocumento')?.value.toString().toUpperCase(),
        rol: this.form.get('cargo')?.value.toString().toUpperCase(),
        direccion: this.form.get('direccion')?.value.toString().toUpperCase(),
        ciudad: this.form.get('ciudad')?.value.toString().toUpperCase(),
        departamento: this.form.get('departamento')?.value.toString().toUpperCase(),
        pais: this.form.get('pais')?.value.toString().toUpperCase(),
        telefono: this.form.get('telefono')?.value.toString().toUpperCase(),
        correoElectronico: this.form.get('correo')?.value.toString().toUpperCase(),
        estado: false
      }

      this.resultado.emit(doctor);
    });

    this.doctorService.obtenerTiposDocumento().subscribe((values: any) => {
      let tipos: any = values.payload;
      for (let i = 0; i < tipos.length; i++) {
        this.tiposDocumento[i] = tipos[i];
      }
    });

    this.doctorService.obtenerRegionesColombia().subscribe((values: any) => {
      this.regiones = values.payload;

      this.departamentos.push({ departamento: this.CambiarMayusculaCadaPalabra(this.regiones[0].departamento) });
      let j = 0;
      for (let i = 0; i < this.regiones.length; i++) {
        if (this.departamentos[j].departamento.toLowerCase() != this.regiones[i].departamento.toLowerCase()) {
          let nombre = this.CambiarMayusculaCadaPalabra(this.regiones[i].departamento);
          j = j + 1;
          this.departamentos[j] = { departamento: nombre };
        }
      }
    });

    this.form.get("departamento")?.valueChanges.subscribe(departamento => {
      this.ciudades = [];
      this.regiones.forEach(region => {
        if (region.departamento.toLowerCase() == departamento.toLowerCase()) {
          this.ciudades.push({ ciudad: this.CambiarMayusculaCadaPalabra(region.municipio) });
        }
      });
    });

    this.form.get("numeroDocumento")?.valueChanges.subscribe((numero: number) => {
      if (numero < 1) {
        this.form.get("numeroDocumento")?.setValue('');
      }

      if (numero > 9999999999) {
        this.form.get("numeroDocumento")?.setValue(9999999999);
      }
    });
  }

  ngOnDestroy(): void {

  }

  ngOnChanges(cambios: SimpleChanges): void {
    if (this.busqueda) {
      let doctor = this.busqueda;

      this.form.get('primerNombre')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.primerNombre));
      this.form.get('segundoNombre')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.segundoNombre ? this.CambiarMayusculaCadaPalabra(doctor.segundoNombre) : ''));
      this.form.get('primerApellido')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.primerApellido));
      this.form.get('segundoApellido')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.segundoApellido ? this.CambiarMayusculaCadaPalabra(doctor.segundoApellido) : ''));
      this.form.get('tipoDocumento')?.patchValue(doctor.tipoDocumento);
      this.form.get('numeroDocumento')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.numeroDocumento));
      this.form.get('cargo')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.rol));
      this.form.get('direccion')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.direccion));
      this.form.get('pais')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.pais));
      this.form.get('departamento')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.departamento));
      this.form.get('ciudad')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.ciudad));
      this.form.get('telefono')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.telefono ? this.CambiarMayusculaCadaPalabra(doctor.telefono) : ''));
      this.form.get('correo')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.correoElectronico ? this.CambiarMayusculaCadaPalabra(doctor.correoElectronico) : ''));
      this.estado = '';
    }
  }

  buscar(evt: any): void {
    let tipoDocumento = this.form.get('tipoDocumento')?.value;
    let numeroDocumento = this.form.get('numeroDocumento')?.value;

    this.doctorService.buscarDoctor(tipoDocumento, numeroDocumento)
      .subscribe((data: any) => {
        if (data.payload.length > 0) {
          let doctor = data.payload[0];
          if (!doctor.deshabilitado) {
            this.form.get('primerNombre')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.primerNombre));
            this.form.get('segundoNombre')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.segundoNombre ? this.CambiarMayusculaCadaPalabra(doctor.segundoNombre) : ''));
            this.form.get('primerApellido')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.primerApellido));
            this.form.get('segundoApellido')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.segundoApellido ? this.CambiarMayusculaCadaPalabra(doctor.segundoApellido) : ''));
            this.form.get('tipoDocumento')?.patchValue(doctor.tipoDocumento);
            this.form.get('numeroDocumento')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.numeroDocumento));
            this.form.get('cargo')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.rol));
            this.form.get('direccion')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.direccionResidencia));
            this.form.get('pais')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.paisResidencia));
            this.form.get('departamento')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.departamentoResidencia));
            this.form.get('ciudad')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.ciudadResidencia));
            this.form.get('telefono')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.telefono ? this.CambiarMayusculaCadaPalabra(doctor.telefono) : ''));
            this.form.get('correo')?.setValue(this.CambiarMayusculaCadaPalabra(doctor.correoElectronico ? this.CambiarMayusculaCadaPalabra(doctor.correoElectronico) : ''));
            this.estado = '';
          } else {
            alert('No se encontraron datos con el criterio de busqueda seleccionado.');
            this.estado = '* Sin guardar *';
          }
        } else {
          alert('No se encontraron datos con el criterio de busqueda seleccionado.')
          this.estado = '* Sin guardar *';
        }
      });
  }

  guardar(evt: any): void {
    let doctor: Doctor = <Doctor>{
      primerNombre: this.form.get('primerNombre')?.value.toString().toUpperCase(),
      segundoNombre: this.form.get('segundoNombre')?.value.toString().toUpperCase(),
      primerApellido: this.form.get('primerApellido')?.value.toString().toUpperCase(),
      segundoApellido: this.form.get('segundoApellido')?.value.toString().toUpperCase(),
      tipoDocumento: this.form.get('tipoDocumento')?.value.toString().toUpperCase(),
      numeroDocumento: this.form.get('numeroDocumento')?.value.toString().toUpperCase(),
      rol: this.form.get('cargo')?.value.toString().toUpperCase(),
      direccion: this.form.get('direccion')?.value.toString().toUpperCase(),
      ciudad: this.form.get('ciudad')?.value.toString().toUpperCase(),
      departamento: this.form.get('departamento')?.value.toString().toUpperCase(),
      pais: this.form.get('pais')?.value.toString().toUpperCase(),
      telefono: this.form.get('telefono')?.value.toString().toUpperCase(),
      correoElectronico: this.form.get('correo')?.value.toString().toUpperCase(),
      estado: true
    }

    this.resultado.emit(doctor);
    this.estado = '';
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

  labels = {
    titulo: "Datos del médico",
    tipoDocumento: "Tipo de documento",
    numeroDocumento: "Numero de documento",
    cargo: "Cargo",
    primerNombre: "Primer nombre",
    segundoNombre: "Segundo nombre",
    primerApellido: "Primer apellido",
    segundoApellido: "Segundo apellido",
    direccion: "Dirección",
    pais: "Pais",
    departamento: "Departamento",
    ciudad: "Ciudad",
    telefono: "Teléfonos de contacto",
    correo: "Correo electrónico",
    guardar: "Guardar"
  };
}
