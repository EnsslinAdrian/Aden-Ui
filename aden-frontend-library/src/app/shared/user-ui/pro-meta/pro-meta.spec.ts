import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProMeta } from './pro-meta';

describe('ProMeta', () => {
  let component: ProMeta;
  let fixture: ComponentFixture<ProMeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProMeta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProMeta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
