import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonRadioInput } from './neon-radio-input';

describe('NeonRadioInput', () => {
  let component: NeonRadioInput;
  let fixture: ComponentFixture<NeonRadioInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonRadioInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonRadioInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
