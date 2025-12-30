import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveTypography } from './interactive-typography';

describe('InteractiveTypography', () => {
  let component: InteractiveTypography;
  let fixture: ComponentFixture<InteractiveTypography>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveTypography]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveTypography);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
