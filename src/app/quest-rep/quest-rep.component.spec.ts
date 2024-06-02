import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestRepComponent } from './quest-rep.component';

describe('QuestRepComponent', () => {
  let component: QuestRepComponent;
  let fixture: ComponentFixture<QuestRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestRepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
