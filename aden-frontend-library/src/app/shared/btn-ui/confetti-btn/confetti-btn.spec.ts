import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfettiBtn } from './confetti-btn';

describe('ConfettiBtn', () => {
  let component: ConfettiBtn;
  let fixture: ComponentFixture<ConfettiBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfettiBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfettiBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
