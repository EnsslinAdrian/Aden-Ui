import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInputs } from './auth-inputs';

describe('AuthInputs', () => {
  let component: AuthInputs;
  let fixture: ComponentFixture<AuthInputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthInputs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthInputs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
