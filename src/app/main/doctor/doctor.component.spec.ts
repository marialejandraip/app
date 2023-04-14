import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorComponent } from './doctor.component';
import { DoctorService } from './doctor.service';

describe('DoctorComponent', () => {
  let component: DoctorComponent;
  let fixture: ComponentFixture<DoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        DoctorService
      ],
      declarations: [ DoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the doctor form', () => {
    expect(component).toBeTruthy();
  });
});
