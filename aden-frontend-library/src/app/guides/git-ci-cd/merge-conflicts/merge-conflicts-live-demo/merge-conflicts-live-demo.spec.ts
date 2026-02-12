import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeConflictsLiveDemo } from './merge-conflicts-live-demo';

describe('MergeConflictsLiveDemo', () => {
  let component: MergeConflictsLiveDemo;
  let fixture: ComponentFixture<MergeConflictsLiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergeConflictsLiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergeConflictsLiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
