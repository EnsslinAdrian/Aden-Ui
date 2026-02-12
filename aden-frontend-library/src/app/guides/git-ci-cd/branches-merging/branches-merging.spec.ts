import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesMerging } from './branches-merging';

describe('BranchesMerging', () => {
  let component: BranchesMerging;
  let fixture: ComponentFixture<BranchesMerging>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesMerging]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchesMerging);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
