import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeConflicts } from './merge-conflicts';

describe('MergeConflicts', () => {
  let component: MergeConflicts;
  let fixture: ComponentFixture<MergeConflicts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergeConflicts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergeConflicts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
