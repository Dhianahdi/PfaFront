import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialitiesDeatilsComponent } from './specialities-deatils.component';

describe('SpecialitiesDeatilsComponent', () => {
  let component: SpecialitiesDeatilsComponent;
  let fixture: ComponentFixture<SpecialitiesDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialitiesDeatilsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialitiesDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
