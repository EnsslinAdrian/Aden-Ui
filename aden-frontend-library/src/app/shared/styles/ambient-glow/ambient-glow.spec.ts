import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbientGlow } from './ambient-glow';

describe('AmbientGlow', () => {
  let component: AmbientGlow;
  let fixture: ComponentFixture<AmbientGlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbientGlow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbientGlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
