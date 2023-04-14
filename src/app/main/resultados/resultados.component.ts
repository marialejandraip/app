import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HistoriaClinica } from '../../models/historiaClinica';

import { ResultadosService } from './resultados.service';

@Component({
  selector: 'resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  dictamen: boolean = false;

  @Input()
  doctor: boolean = false;

  @Input()
  paciente: boolean = false;

  @Input()
  historiaClinica: HistoriaClinica = <HistoriaClinica>{};

  sePuedeGuardar: boolean = false;

  estado: string = '* Sin guardar *';

  form: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly resultados: ResultadosService) {
    this.form = fb.group({
      correo: [''],
      guardar: ['']
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.estado = '* Sin guardar *';
    });
  }

  ngOnDestroy(): void {

  }

  ngOnChanges(cambios: SimpleChanges): void {
    if (this.dictamen) {
      this.sePuedeGuardar = true;
    } else {
      this.sePuedeGuardar = false;
    }
  }

  guardar(evt: any) {
    this.estado = '';
    this.resultados.guardarDictamen(this.historiaClinica).subscribe(res => {
      alert("Se ha creado un dictamen");
    });
  }

  labels = {
    titulo: "Resultados",
    correo: "Correo electrónico",
    guardar: "Guardar"
  }
}
