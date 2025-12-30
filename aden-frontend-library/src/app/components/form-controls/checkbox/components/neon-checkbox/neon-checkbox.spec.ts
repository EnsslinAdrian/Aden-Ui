import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonCheckbox } from './neon-checkbox';

describe('NeonCheckbox', () => {
  let component: NeonCheckbox;
  let fixture: ComponentFixture<NeonCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonCheckbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
