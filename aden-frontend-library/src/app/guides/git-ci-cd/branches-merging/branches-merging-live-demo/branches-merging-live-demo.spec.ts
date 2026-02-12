import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesMergingLiveDemo } from './branches-merging-live-demo';

describe('BranchesMergingLiveDemo', () => {
  let component: BranchesMergingLiveDemo;
  let fixture: ComponentFixture<BranchesMergingLiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesMergingLiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchesMergingLiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
