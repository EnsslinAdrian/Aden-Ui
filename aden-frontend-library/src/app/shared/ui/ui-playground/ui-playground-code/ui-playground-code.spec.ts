import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPlaygroundCode } from './ui-playground-code';

describe('UiPlaygroundCode', () => {
  let component: UiPlaygroundCode;
  let fixture: ComponentFixture<UiPlaygroundCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPlaygroundCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiPlaygroundCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
