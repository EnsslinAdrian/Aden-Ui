import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BentoGridSystem } from './bento-grid-system';

describe('BentoGridSystem', () => {
  let component: BentoGridSystem;
  let fixture: ComponentFixture<BentoGridSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BentoGridSystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BentoGridSystem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
