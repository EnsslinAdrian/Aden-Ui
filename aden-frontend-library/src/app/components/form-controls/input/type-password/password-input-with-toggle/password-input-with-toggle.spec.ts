import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputWithToggle } from './password-input-with-toggle';

describe('PasswordInputWithToggle', () => {
  let component: PasswordInputWithToggle;
  let fixture: ComponentFixture<PasswordInputWithToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInputWithToggle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordInputWithToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
