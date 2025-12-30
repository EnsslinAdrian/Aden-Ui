import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartAutocomplete } from './smart-autocomplete';

describe('SmartAutocomplete', () => {
  let component: SmartAutocomplete;
  let fixture: ComponentFixture<SmartAutocomplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartAutocomplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartAutocomplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
