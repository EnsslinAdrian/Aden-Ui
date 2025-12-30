import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tootltip } from './tootltip';

describe('Tootltip', () => {
  let component: Tootltip;
  let fixture: ComponentFixture<Tootltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tootltip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tootltip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
