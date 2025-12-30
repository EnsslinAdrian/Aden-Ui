import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonGlowHoverButton } from './neon-glow-hover-button';

describe('NeonGlowHoverButton', () => {
  let component: NeonGlowHoverButton;
  let fixture: ComponentFixture<NeonGlowHoverButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonGlowHoverButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonGlowHoverButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
