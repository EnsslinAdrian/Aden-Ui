import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleVisualizer } from './bundle-visualizer';

describe('BundleVisualizer', () => {
  let component: BundleVisualizer;
  let fixture: ComponentFixture<BundleVisualizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BundleVisualizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BundleVisualizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
