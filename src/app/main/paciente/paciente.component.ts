import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Paciente } from 'src/app/models/paciente';

import { PacienteService } from './paciente.service';

import * as moment from 'moment';

@Component({
  selector: 'paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  busqueda: Paciente = <Paciente>{};

  @Output()
  resultado: EventEmitter<Paciente> = new EventEmitter<Paciente>();

  estado: string = '* Sin guardar *';

  tiposDocumento: any[] = [];
  generos: any[] = [];
  estadosciviles: any[] = [];
  nivelesescolaridad: any[] = [];
  regiones: any[] = [];
  departamentos: any[] = [];
  ciudades: any[] = [];
  departamentosnacimiento: any[] = [];
  ciudadesnacimiento: any[] = [];
  arls: any[] = [];
  afps: any[] = [];
  epss: any[] = [];

  form: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly pacienteService: PacienteService) {
    this.form = fb.group({
      tipoDocumento: ['CC'],
      numeroDocumento: ['', Validators.required],
      genero: ['Varón'],
      estadocivil: ['Soltero'],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      fechanacimiento: ['', Validators.required],
      edad: ['0 años'],
      paisnacimiento: ['Colombia'],
      departamentonacimiento: ['', Validators.required],
      ciudadnacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      pais: ['Colombia'],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: [''],
      correo: ['', Validators.email],
      nivelescolaridad: ['Ninguno'],
      profesion: ['', Validators.required],
      eps: ['Ninguna'],
      arl: ['Ninguna'],
      afp: ['Ninguna']
    });
  }

  ngOnInit(): void {
    this.form.get("pais")?.disable();
    this.form.get("paisnacimiento")?.disable();
    this.form.get("edad")?.disable();

    if (this.busqueda) {
      this.form.setValue(this.busqueda);
    }

    this.form.valueChanges.subscribe(() => {
      this.estado = '* Sin guardar *';

      let paciente: Paciente = <Paciente>{
        primerNombre: this.form.get('primerNombre')?.value.toString().toUpperCase(),
        segundoNombre: this.form.get('segundoNombre')?.value.toString().toUpperCase(),
        primerApellido: this.form.get('primerApellido')?.value.toString().toUpperCase(),
        segundoApellido: this.form.get('segundoApellido')?.value.toString().toUpperCase(),
        tipoDocumento: this.form.get('tipoDocumento')?.value.toString().toUpperCase(),
        numeroDocumento: this.form.get('numeroDocumento')?.value.toString().toUpperCase(),
        genero: this.form.get('genero')?.value.toString().toUpperCase(),
        estadoCivil: this.form.get('estadocivil')?.value.toString().toUpperCase(),
        fechaNacimiento: this.form.get('fechanacimiento')?.value.toString().toUpperCase(),
        ciudadNacimiento: this.form.get('ciudadnacimiento')?.value.toString().toUpperCase(),
        departamentoNacimiento: this.form.get('departamentonacimiento')?.value.toString().toUpperCase(),
        paisNacimiento: this.form.get('paisnacimiento')?.value.toString().toUpperCase(),
        direccionResidencia: this.form.get('direccion')?.value.toString().toUpperCase(),
        ciudadResidencia: this.form.get('ciudad')?.value.toString().toUpperCase(),
        departamentoResidencia: this.form.get('departamento')?.value.toString().toUpperCase(),
        paisResidencia: this.form.get('pais')?.value.toString().toUpperCase(),
        telefono: this.form.get('telefono')?.value.toString().toUpperCase(),
        correoElectronico: this.form.get('correo')?.value.toString().toUpperCase(),
        nivelEscolaridad: this.form.get('nivelescolaridad')?.value.toString().toUpperCase(),
        profesionOficio: this.form.get('profesion')?.value.toString().toUpperCase(),
        arl: this.form.get('arl')?.value.toString().toUpperCase(),
        eps: this.form.get('eps')?.value.toString().toUpperCase(),
        afp: this.form.get('afp')?.value.toString().toUpperCase(),
        estado: false
      }

      this.resultado.emit(paciente);
    });

    this.pacienteService.obtenerTiposDocumento().subscribe((values: any) => {
      let tipos: any = values.payload;
      for (let i = 0; i < tipos.length; i++) {
        this.tiposDocumento[i] = tipos[i];
      }
    });

    this.pacienteService.obtenerGeneros().subscribe((values: any) => {
      let tipos: any = values.payload;
      for (let i = 0; i < tipos.length; i++) {
        this.generos[i] = tipos[i];
      }
    });

    this.pacienteService.obtenerEstadosCiviles().subscribe((values: any) => {
      let tipos: any = values.payload;
      for (let i = 0; i < tipos.length; i++) {
        this.estadosciviles[i] = tipos[i];
      }
    });

    this.pacienteService.obtenerNivelesEscolaridad().subscribe((values: any) => {
      let tipos: any = values.payload;
      for (let i = 0; i < tipos.length; i++) {
        this.nivelesescolaridad[i] = { nombre: this.CambiarMayusculaCadaPalabra(tipos[i].nombre) };
      }
    });

    this.pacienteService.obtenerEpss().subscribe((values: any) => {
      let tipos: any = values.payload;
      for (let i = 0; i < tipos.length; i++) {
        let nombre = this.CambiarMayusculaCadaPalabra(tipos[i].nombre);
        this.epss[i] = { nombre: nombre };
      }
    });

    this.pacienteService.obtenerArls().subscribe((values: any) => {
      let tipos: any = values.payload;
      for (let i = 0; i < tipos.length; i++) {
        let nombre = this.CambiarMayusculaCadaPalabra(tipos[i].nombre);
        this.arls[i] = { nombre: nombre };
      }
    });

    this.pacienteService.obtenerAfps().subscribe((values: any) => {
      let tipos: any = values.payload;
      for (let i = 0; i < tipos.length; i++) {
        let nombre = this.CambiarMayusculaCadaPalabra(tipos[i].nombre);
        this.afps[i] = { nombre: nombre };
      }
    });

    this.pacienteService.obtenerRegionesColombia().subscribe((values: any) => {
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
      this.departamentosnacimiento = this.departamentos;
    });

    this.form.get("departamento")?.valueChanges.subscribe(departamento => {
      this.ciudades = [];
      this.regiones.forEach(region => {
        if (region.departamento.toLowerCase() == departamento.toLowerCase()) {
          this.ciudades.push({ ciudad: this.CambiarMayusculaCadaPalabra(region.municipio) });
        }
      });
    });

    this.form.get("departamentonacimiento")?.valueChanges.subscribe(departamento => {
      this.ciudadesnacimiento = [];
      this.regiones.forEach(region => {
        if (region.departamento.toLowerCase() == departamento.toLowerCase()) {
          this.ciudadesnacimiento.push({ ciudad: this.CambiarMayusculaCadaPalabra(region.municipio) });
        }
      });
    });

    this.form.get("tipoDocumento")?.valueChanges.subscribe((fecha: Date) => {
      this.obtenerMaximaFecha();
    });

    this.form.get("numeroDocumento")?.valueChanges.subscribe((numero: number) => {
      if (numero < 1) {
        this.form.get("numeroDocumento")?.setValue('');
      }

      if (numero > 9999999999) {
        this.form.get("numeroDocumento")?.setValue(9999999999);
      }
    });

    this.form.get("fechanacimiento")?.valueChanges.subscribe((fecha: Date) => {
      let diferencia = Math.abs(Date.now() - new Date(fecha).getTime());
      let edad = (Math.ceil((diferencia / (1000 * 3600 * 24)) / 365)) - 1;
      this.form.get("edad")?.setValue(edad + " años");
    });
  }

  ngOnDestroy(): void {

  }

  ngOnChanges(cambios: SimpleChanges): void {
    if (this.busqueda) {
      let paciente = this.busqueda;

      this.form.get('primerNombre')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.primerNombre));
      this.form.get('segundoNombre')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.segundoNombre ? this.CambiarMayusculaCadaPalabra(paciente.segundoNombre) : ''));
      this.form.get('primerApellido')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.primerApellido));
      this.form.get('segundoApellido')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.segundoApellido ? this.CambiarMayusculaCadaPalabra(paciente.segundoApellido) : ''));
      this.form.get('tipoDocumento')?.patchValue(paciente.tipoDocumento);
      this.form.get('numeroDocumento')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.numeroDocumento));
      this.form.get('genero')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.genero));
      this.form.get('estadocivil')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.estadoCivil));
      this.form.get('fechanacimiento')?.setValue(new Date(paciente.fechaNacimiento).toISOString().slice(0, 10));
      this.form.get('ciudadnacimiento')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.ciudadNacimiento));
      this.form.get('departamentonacimiento')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.departamentoNacimiento));
      this.form.get('paisnacimiento')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.paisNacimiento));
      this.form.get('direccion')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.direccionResidencia));
      this.form.get('pais')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.paisResidencia));
      this.form.get('departamento')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.departamentoResidencia));
      this.form.get('ciudad')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.ciudadResidencia));
      this.form.get('telefono')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.telefono ? this.CambiarMayusculaCadaPalabra(paciente.telefono) : ''));
      this.form.get('correo')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.correoElectronico ? this.CambiarMayusculaCadaPalabra(paciente.correoElectronico) : ''));
      this.form.get('nivelescolaridad')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.nivelEscolaridad ? paciente.nivelEscolaridad : ''));
      this.form.get('profesion')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.profesionOficio ? paciente.profesionOficio : ''));
      this.form.get('arl')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.arl ? this.CambiarMayusculaCadaPalabra(paciente.arl) : ''));
      this.form.get('eps')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.eps ? paciente.eps : ''));
      this.form.get('afp')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.afp ? this.CambiarMayusculaCadaPalabra(paciente.afp) : ''));

      this.estado = '';
    }
  }

  obtenerMaximaFecha(): string {
    let tipo = this.form.get('tipoDocumento')?.value;
    let maximo = new Date().toISOString().split('T')[0];
    if (tipo == 'CC') {
      maximo = moment(new Date().toISOString().split('T')[0]).subtract(18, 'years').toISOString().split('T')[0];
    }
    return maximo;
  }

  buscar(evt: any): void {
    let tipoDocumento = this.form.get('tipoDocumento')?.value;
    let numeroDocumento = this.form.get('numeroDocumento')?.value;

    this.pacienteService.buscarPaciente(tipoDocumento, numeroDocumento)
      .subscribe((data: any) => {
        if (data.payload.length > 0) {
          let paciente = data.payload[0];
          if (!paciente.deshabilitado) {
            this.form.get('primerNombre')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.primerNombre));
            this.form.get('segundoNombre')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.segundoNombre ? this.CambiarMayusculaCadaPalabra(paciente.segundoNombre) : ''));
            this.form.get('primerApellido')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.primerApellido));
            this.form.get('segundoApellido')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.segundoApellido ? this.CambiarMayusculaCadaPalabra(paciente.segundoApellido) : ''));
            this.form.get('tipoDocumento')?.patchValue(paciente.tipoDocumento);
            this.form.get('numeroDocumento')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.numeroDocumento));
            this.form.get('genero')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.genero));
            this.form.get('estadocivil')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.estadoCivil));
            this.form.get('fechanacimiento')?.setValue(new Date(paciente.fechaNacimiento).toISOString().slice(0, 10));
            this.form.get('ciudadnacimiento')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.ciudadNacimiento));
            this.form.get('departamentonacimiento')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.departamentoNacimiento));
            this.form.get('paisnacimiento')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.paisNacimiento));
            this.form.get('direccion')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.direccionResidencia));
            this.form.get('pais')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.paisResidencia));
            this.form.get('departamento')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.departamentoResidencia));
            this.form.get('ciudad')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.ciudadResidencia));
            this.form.get('telefono')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.telefono ? this.CambiarMayusculaCadaPalabra(paciente.telefono) : ''));
            this.form.get('correo')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.correoElectronico ? this.CambiarMayusculaCadaPalabra(paciente.correoElectronico) : ''));
            this.form.get('nivelescolaridad')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.nivelEscolaridad));
            this.form.get('profesion')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.profesionOficio));
            this.form.get('arl')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.arl ? this.CambiarMayusculaCadaPalabra(paciente.arl) : ''));
            this.form.get('eps')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.eps));
            this.form.get('afp')?.setValue(this.CambiarMayusculaCadaPalabra(paciente.afp ? this.CambiarMayusculaCadaPalabra(paciente.afp) : ''));

            this.estado = '';
          } else {
            alert('No se encontraron datos con el criterio de busqueda seleccionado.');
            this.estado = '* Sin guardar *';
          }
        } else {
          alert('No se encontraron datos con el criterio de busqueda seleccionado.');
          this.estado = '* Sin guardar *';
        }
      });
  }

  guardar(evt: any): void {
    let paciente: Paciente = <Paciente>{
      primerNombre: this.form.get('primerNombre')?.value.toString().toUpperCase(),
      segundoNombre: this.form.get('segundoNombre')?.value.toString().toUpperCase(),
      primerApellido: this.form.get('primerApellido')?.value.toString().toUpperCase(),
      segundoApellido: this.form.get('segundoApellido')?.value.toString().toUpperCase(),
      tipoDocumento: this.form.get('tipoDocumento')?.value.toString().toUpperCase(),
      numeroDocumento: this.form.get('numeroDocumento')?.value.toString().toUpperCase(),
      genero: this.form.get('genero')?.value.toString().toUpperCase(),
      estadoCivil: this.form.get('estadocivil')?.value.toString().toUpperCase(),
      fechaNacimiento: this.form.get('fechanacimiento')?.value.toString().toUpperCase(),
      ciudadNacimiento: this.form.get('ciudadnacimiento')?.value.toString().toUpperCase(),
      departamentoNacimiento: this.form.get('departamentonacimiento')?.value.toString().toUpperCase(),
      paisNacimiento: this.form.get('paisnacimiento')?.value.toString().toUpperCase(),
      direccionResidencia: this.form.get('direccion')?.value.toString().toUpperCase(),
      ciudadResidencia: this.form.get('ciudad')?.value.toString().toUpperCase(),
      departamentoResidencia: this.form.get('departamento')?.value.toString().toUpperCase(),
      paisResidencia: this.form.get('pais')?.value.toString().toUpperCase(),
      telefono: this.form.get('telefono')?.value.toString().toUpperCase(),
      correoElectronico: this.form.get('correo')?.value.toString().toUpperCase(),
      nivelEscolaridad: this.form.get('nivelescolaridad')?.value.toString().toUpperCase(),
      profesionOficio: this.form.get('profesion')?.value.toString().toUpperCase(),
      arl: this.form.get('arl')?.value.toString().toUpperCase(),
      eps: this.form.get('eps')?.value.toString().toUpperCase(),
      afp: this.form.get('afp')?.value.toString().toUpperCase(),
      estado: true
    }

    this.resultado.emit(paciente);
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
    tipoDocumento: "Tipo de documento",
    numeroDocumento: "Numero de documento",
    genero: "Género",
    estadocivil: "Estado civil",
    titulo: "Datos del paciente",
    primerNombre: "Primer nombre",
    segundoNombre: "Segundo nombre",
    primerApellido: "Primer apellido",
    segundoApellido: "Segundo apellido",
    fechanacimiento: "Fecha de nacimiento",
    edad: "Edad",
    paisnacimiento: "Pais de nacimiento",
    departamentonacimiento: "Departamento de nacimiento",
    ciudadnacimiento: "Ciudad de nacimiento",
    direccion: "Dirección de residencia",
    pais: "Pais de residencia",
    departamento: "Departamento de residencia",
    ciudad: "Ciudad de residencia",
    telefono: "Teléfonos de contacto",
    correo: "Correo electrónico",
    nivelescolaridad: "Nivel de escolaridad",
    profesion: "Profesión u oficio",
    eps: "Empresa promotora de salud",
    arl: "Administradora de riesgos laborales",
    afp: "Administradoras de Fondos de Pensiones",
    guardar: "Guardar"
  };
}
