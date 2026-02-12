import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stashing } from './stashing';

describe('Stashing', () => {
  let component: Stashing;
  let fixture: ComponentFixture<Stashing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stashing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stashing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
