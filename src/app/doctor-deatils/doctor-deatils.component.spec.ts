import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDeatilsComponent } from './doctor-deatils.component';

describe('DoctorDeatilsComponent', () => {
  let component: DoctorDeatilsComponent;
  let fixture: ComponentFixture<DoctorDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorDeatilsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
