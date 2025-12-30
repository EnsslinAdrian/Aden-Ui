import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showecase } from './showecase';

describe('Showecase', () => {
  let component: Showecase;
  let fixture: ComponentFixture<Showecase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Showecase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Showecase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
