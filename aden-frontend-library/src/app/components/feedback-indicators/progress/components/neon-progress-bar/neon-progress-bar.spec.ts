import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonProgressBar } from './neon-progress-bar';

describe('NeonProgressBar', () => {
  let component: NeonProgressBar;
  let fixture: ComponentFixture<NeonProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonProgressBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonProgressBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
