import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAvailableComponent } from './doc-available.component';

describe('DocAvailableComponent', () => {
  let component: DocAvailableComponent;
  let fixture: ComponentFixture<DocAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocAvailableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
