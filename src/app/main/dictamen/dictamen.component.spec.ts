import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictamenComponent } from './dictamen.component';
import { DictamenService } from './dictamen.service';

describe('DictamenComponent', () => {
  let component: DictamenComponent;
  let fixture: ComponentFixture<DictamenComponent>;
  let dictamenService: DictamenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictamenComponent ],
      providers: [
        {
          provide: DictamenService,
          useValue: {
            obtenerUltimoDictamen: () => {
              payload: [{ consecutivo: 123 }]
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a dictamen component', () => {
    expect(component).toBeTruthy();
  });

});
