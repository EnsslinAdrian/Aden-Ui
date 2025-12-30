import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputNeonStyle } from './text-input-neon-style';

describe('TextInputNeonStyle', () => {
  let component: TextInputNeonStyle;
  let fixture: ComponentFixture<TextInputNeonStyle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInputNeonStyle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInputNeonStyle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
