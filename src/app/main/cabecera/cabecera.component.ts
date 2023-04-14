import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.labels = { titulo: "", subtitulo: "" };
  }

  labels = {
    titulo: "FORMULARIO DE DICTAMEN PARA LA CALIFICACIÓN DE LA PÉRDIDA DE CAPACIDAD LABORAL Y DETERMINACIÓN DE LA INVALIDEZ",
    subtitulo: "Calificación basada en el manual único para la calificación de la pérdida de la capacidad laboral y ocupacional - decreto 1507 del 12 de agosto de 2014"
  }
}
