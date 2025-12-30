import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdvantages } from './register-advantages';

describe('RegisterAdvantages', () => {
  let component: RegisterAdvantages;
  let fixture: ComponentFixture<RegisterAdvantages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAdvantages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAdvantages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
