import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineGuides } from './headline-guides';

describe('HeadlineGuides', () => {
  let component: HeadlineGuides;
  let fixture: ComponentFixture<HeadlineGuides>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadlineGuides]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadlineGuides);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
