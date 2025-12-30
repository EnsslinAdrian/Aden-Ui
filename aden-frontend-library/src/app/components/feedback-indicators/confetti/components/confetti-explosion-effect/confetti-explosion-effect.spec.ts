import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfettiExplosionEffect } from './confetti-explosion-effect';

describe('ConfettiExplosionEffect', () => {
  let component: ConfettiExplosionEffect;
  let fixture: ComponentFixture<ConfettiExplosionEffect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfettiExplosionEffect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfettiExplosionEffect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
