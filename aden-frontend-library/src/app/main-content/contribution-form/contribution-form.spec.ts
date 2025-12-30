import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionForm } from './contribution-form';

describe('ContributionForm', () => {
  let component: ContributionForm;
  let fixture: ComponentFixture<ContributionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
