import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsavedChanges } from './unsaved-changes';

describe('UnsavedChanges', () => {
  let component: UnsavedChanges;
  let fixture: ComponentFixture<UnsavedChanges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsavedChanges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsavedChanges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
