import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveValidator } from './live-validator';

describe('LiveValidator', () => {
  let component: LiveValidator;
  let fixture: ComponentFixture<LiveValidator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveValidator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveValidator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
