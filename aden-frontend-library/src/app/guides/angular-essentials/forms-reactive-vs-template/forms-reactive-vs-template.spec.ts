import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsReactiveVsTemplate } from './forms-reactive-vs-template';

describe('FormsReactiveVsTemplate', () => {
  let component: FormsReactiveVsTemplate;
  let fixture: ComponentFixture<FormsReactiveVsTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsReactiveVsTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsReactiveVsTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
