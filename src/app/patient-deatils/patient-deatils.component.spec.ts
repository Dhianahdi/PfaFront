import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDeatilsComponent } from './patient-deatils.component';

describe('PatientDeatilsComponent', () => {
  let component: PatientDeatilsComponent;
  let fixture: ComponentFixture<PatientDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDeatilsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
