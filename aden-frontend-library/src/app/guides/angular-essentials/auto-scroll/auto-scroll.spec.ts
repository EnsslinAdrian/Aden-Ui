import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoScroll } from './auto-scroll';

describe('AutoScroll', () => {
  let component: AutoScroll;
  let fixture: ComponentFixture<AutoScroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoScroll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoScroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
