import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeBlockGuide } from './code-block-guide';

describe('CodeBlockGuide', () => {
  let component: CodeBlockGuide;
  let fixture: ComponentFixture<CodeBlockGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeBlockGuide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeBlockGuide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
