import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebaseHistory } from './rebase-history';

describe('RebaseHistory', () => {
  let component: RebaseHistory;
  let fixture: ComponentFixture<RebaseHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RebaseHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RebaseHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
