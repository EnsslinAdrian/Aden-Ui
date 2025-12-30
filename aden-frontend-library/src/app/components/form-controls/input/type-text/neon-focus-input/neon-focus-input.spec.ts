import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonFocusInput } from './neon-focus-input';

describe('NeonFocusInput', () => {
  let component: NeonFocusInput;
  let fixture: ComponentFixture<NeonFocusInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonFocusInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonFocusInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
