import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionViewComponent } from './prediction-view.component';

describe('PredictionViewComponent', () => {
  let component: PredictionViewComponent;
  let fixture: ComponentFixture<PredictionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
