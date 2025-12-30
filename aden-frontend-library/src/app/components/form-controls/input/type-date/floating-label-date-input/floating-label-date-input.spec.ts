import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingLabelDateInput } from './floating-label-date-input';

describe('FloatingLabelDateInput', () => {
  let component: FloatingLabelDateInput;
  let fixture: ComponentFixture<FloatingLabelDateInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingLabelDateInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingLabelDateInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
