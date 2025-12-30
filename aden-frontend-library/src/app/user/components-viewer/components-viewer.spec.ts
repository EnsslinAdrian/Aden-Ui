import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsViewer } from './components-viewer';

describe('ComponentsViewer', () => {
  let component: ComponentsViewer;
  let fixture: ComponentFixture<ComponentsViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
