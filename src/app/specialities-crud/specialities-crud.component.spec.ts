import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialitiesCrudComponent } from './specialities-crud.component';

describe('SpecialitiesCrudComponent', () => {
  let component: SpecialitiesCrudComponent;
  let fixture: ComponentFixture<SpecialitiesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialitiesCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialitiesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
