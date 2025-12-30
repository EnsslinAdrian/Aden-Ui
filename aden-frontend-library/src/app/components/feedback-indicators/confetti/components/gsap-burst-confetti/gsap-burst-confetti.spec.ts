import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsapBurstConfetti } from './gsap-burst-confetti';

describe('GsapBurstConfetti', () => {
  let component: GsapBurstConfetti;
  let fixture: ComponentFixture<GsapBurstConfetti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GsapBurstConfetti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GsapBurstConfetti);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
