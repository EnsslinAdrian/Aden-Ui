import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPlayground } from './ui-playground';

describe('UiPlayground', () => {
  let component: UiPlayground;
  let fixture: ComponentFixture<UiPlayground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPlayground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiPlayground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
