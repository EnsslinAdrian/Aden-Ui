import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedIconSearch } from './rounded-icon-search';

describe('RoundedIconSearch', () => {
  let component: RoundedIconSearch;
  let fixture: ComponentFixture<RoundedIconSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundedIconSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundedIconSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
