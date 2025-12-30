import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningBtn } from './warning-btn';

describe('WarningBtn', () => {
  let component: WarningBtn;
  let fixture: ComponentFixture<WarningBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarningBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
