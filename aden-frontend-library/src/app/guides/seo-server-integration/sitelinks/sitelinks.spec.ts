import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sitelinks } from './sitelinks';

describe('Sitelinks', () => {
  let component: Sitelinks;
  let fixture: ComponentFixture<Sitelinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sitelinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sitelinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
