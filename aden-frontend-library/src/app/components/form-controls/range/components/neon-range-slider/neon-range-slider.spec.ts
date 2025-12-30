import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonRangeSlider } from './neon-range-slider';

describe('NeonRangeSlider', () => {
  let component: NeonRangeSlider;
  let fixture: ComponentFixture<NeonRangeSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonRangeSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonRangeSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
