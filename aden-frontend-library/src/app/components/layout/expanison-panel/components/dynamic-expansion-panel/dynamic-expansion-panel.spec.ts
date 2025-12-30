import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicExpansionPanel } from './dynamic-expansion-panel';

describe('DynamicExpansionPanel', () => {
  let component: DynamicExpansionPanel;
  let fixture: ComponentFixture<DynamicExpansionPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicExpansionPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicExpansionPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
