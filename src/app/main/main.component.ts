import { Component, OnDestroy, OnInit } from '@angular/core';

import { Dictamen } from '../models/dictamen';
import { Doctor } from '../models/doctor';
import { HistoriaClinica } from '../models/historiaClinica';
import { Paciente } from '../models/paciente';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  dictamen: boolean = false;
  doctor: boolean = false;
  paciente: boolean = false;

  historiaClinica: HistoriaClinica = <HistoriaClinica>{};

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {

  }

  obtenerDictamen(dictamen: Dictamen) {
    this.historiaClinica.dictamen = dictamen;
    this.dictamen = dictamen.estado;
  }

  obtenerDoctor(doctor: Doctor) {
    this.historiaClinica.doctor = doctor;
    this.doctor = doctor.estado;
  }

  obtenerPaciente(paciente: Paciente) {
    this.historiaClinica.paciente = paciente;
    this.paciente = paciente.estado;
  }

  obtenerHistoriaClinica(historiaClinica: HistoriaClinica) {
    this.historiaClinica = historiaClinica;
  }
}
