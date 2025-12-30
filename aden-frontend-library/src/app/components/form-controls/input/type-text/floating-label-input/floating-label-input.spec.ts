import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingLabelInput } from './floating-label-input';

describe('FloatingLabelInput', () => {
  let component: FloatingLabelInput;
  let fixture: ComponentFixture<FloatingLabelInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingLabelInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingLabelInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
