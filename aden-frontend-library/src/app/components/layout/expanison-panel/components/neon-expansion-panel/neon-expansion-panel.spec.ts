import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonExpansionPanel } from './neon-expansion-panel';

describe('NeonExpansionPanel', () => {
  let component: NeonExpansionPanel;
  let fixture: ComponentFixture<NeonExpansionPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonExpansionPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonExpansionPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
