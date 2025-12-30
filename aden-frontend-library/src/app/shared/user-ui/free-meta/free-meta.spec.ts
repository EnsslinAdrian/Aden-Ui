import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeMeta } from './free-meta';

describe('FreeMeta', () => {
  let component: FreeMeta;
  let fixture: ComponentFixture<FreeMeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeMeta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeMeta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
