import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Validatorspage } from './validatorspage';

describe('Validatorspage', () => {
  let component: Validatorspage;
  let fixture: ComponentFixture<Validatorspage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Validatorspage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Validatorspage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
