import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsapReactiveHoverButton } from './gsap-reactive-hover-button';

describe('GsapReactiveHoverButton', () => {
  let component: GsapReactiveHoverButton;
  let fixture: ComponentFixture<GsapReactiveHoverButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GsapReactiveHoverButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GsapReactiveHoverButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
