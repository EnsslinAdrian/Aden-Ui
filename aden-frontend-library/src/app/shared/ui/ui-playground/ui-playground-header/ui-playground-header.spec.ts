import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPlaygroundHeader } from './ui-playground-header';

describe('UiPlaygroundHeader', () => {
  let component: UiPlaygroundHeader;
  let fixture: ComponentFixture<UiPlaygroundHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPlaygroundHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiPlaygroundHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
