import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonValidationForm } from './neon-validation-form';

describe('NeonValidationForm', () => {
  let component: NeonValidationForm;
  let fixture: ComponentFixture<NeonValidationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonValidationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonValidationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
