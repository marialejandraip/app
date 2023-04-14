import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraComponent } from './cabecera.component';

describe('CabeceraComponent', () => {
  let component: CabeceraComponent;
  let fixture: ComponentFixture<CabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabeceraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header in the dom', () => {
    expect(component).toBeTruthy();

  });
  it(`should have as title 'app'`, () => {
    const fixture = TestBed.createComponent(CabeceraComponent);
    const app = fixture.componentInstance;
    expect(app.labels.titulo).toEqual('FORMULARIO DE DICTAMEN PARA LA CALIFICACIÓN DE LA PÉRDIDA DE CAPACIDAD LABORAL Y DETERMINACIÓN DE LA INVALIDEZ');
  });

  it(`should have a subtitle 'app'`, () => {
    const fixture = TestBed.createComponent(CabeceraComponent);
    const app = fixture.componentInstance;
    expect(app.labels.subtitulo).toEqual('Calificación basada en el manual único para la calificación de la pérdida de la capacidad laboral y ocupacional - decreto 1507 del 12 de agosto de 2014');
  });
});
