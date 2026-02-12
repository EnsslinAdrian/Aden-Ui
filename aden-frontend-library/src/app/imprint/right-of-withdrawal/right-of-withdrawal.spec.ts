import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightOfWithdrawal } from './right-of-withdrawal';

describe('RightOfWithdrawal', () => {
  let component: RightOfWithdrawal;
  let fixture: ComponentFixture<RightOfWithdrawal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightOfWithdrawal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightOfWithdrawal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
