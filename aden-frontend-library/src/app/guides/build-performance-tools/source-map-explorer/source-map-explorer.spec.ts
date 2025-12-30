import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMapExplorer } from './source-map-explorer';

describe('SourceMapExplorer', () => {
  let component: SourceMapExplorer;
  let fixture: ComponentFixture<SourceMapExplorer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceMapExplorer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceMapExplorer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
