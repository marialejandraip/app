import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { DictamenComponent } from './dictamen/dictamen.component';
import { DictamenService } from './dictamen/dictamen.service';
import { DoctorComponent } from './doctor/doctor.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ResultadosComponent } from './resultados/resultados.component';


@NgModule({
  declarations: [
    MainComponent,
    CabeceraComponent,
    DictamenComponent,
    DoctorComponent,
    PacienteComponent,
    ResultadosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DictamenService
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
