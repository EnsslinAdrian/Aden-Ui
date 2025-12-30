import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeHighlight } from './code-highlight';

describe('CodeHighlight', () => {
  let component: CodeHighlight;
  let fixture: ComponentFixture<CodeHighlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeHighlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeHighlight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
