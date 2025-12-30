import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contribution } from './contribution';

describe('Contribution', () => {
  let component: Contribution;
  let fixture: ComponentFixture<Contribution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contribution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contribution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
