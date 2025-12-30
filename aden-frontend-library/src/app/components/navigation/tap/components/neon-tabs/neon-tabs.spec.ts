import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonTabs } from './neon-tabs';

describe('NeonTabs', () => {
  let component: NeonTabs;
  let fixture: ComponentFixture<NeonTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
