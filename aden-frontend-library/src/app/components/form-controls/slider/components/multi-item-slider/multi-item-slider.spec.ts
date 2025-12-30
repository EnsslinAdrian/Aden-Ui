import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiItemSlider } from './multi-item-slider';

describe('MultiItemSlider', () => {
  let component: MultiItemSlider;
  let fixture: ComponentFixture<MultiItemSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiItemSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiItemSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
