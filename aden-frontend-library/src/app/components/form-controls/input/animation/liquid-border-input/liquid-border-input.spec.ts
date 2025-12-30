import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidBorderInput } from './liquid-border-input';

describe('LiquidBorderInput', () => {
  let component: LiquidBorderInput;
  let fixture: ComponentFixture<LiquidBorderInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiquidBorderInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidBorderInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
