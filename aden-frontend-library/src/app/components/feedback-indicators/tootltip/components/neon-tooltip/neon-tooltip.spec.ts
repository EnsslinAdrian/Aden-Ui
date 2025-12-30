import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonTooltip } from './neon-tooltip';

describe('NeonTooltip', () => {
  let component: NeonTooltip;
  let fixture: ComponentFixture<NeonTooltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonTooltip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonTooltip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
