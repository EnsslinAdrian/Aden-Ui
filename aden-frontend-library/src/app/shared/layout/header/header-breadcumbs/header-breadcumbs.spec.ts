import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBreadcumbs } from './header-breadcumbs';

describe('HeaderBreadcumbs', () => {
  let component: HeaderBreadcumbs;
  let fixture: ComponentFixture<HeaderBreadcumbs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBreadcumbs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBreadcumbs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
