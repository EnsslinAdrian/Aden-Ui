import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuelRight } from './visuel-right';

describe('VisuelRight', () => {
  let component: VisuelRight;
  let fixture: ComponentFixture<VisuelRight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisuelRight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuelRight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
