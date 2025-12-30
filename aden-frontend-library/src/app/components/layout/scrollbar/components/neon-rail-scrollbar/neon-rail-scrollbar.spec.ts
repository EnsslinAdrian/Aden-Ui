import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonRailScrollbar } from './neon-rail-scrollbar';

describe('NeonRailScrollbar', () => {
  let component: NeonRailScrollbar;
  let fixture: ComponentFixture<NeonRailScrollbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonRailScrollbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonRailScrollbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
