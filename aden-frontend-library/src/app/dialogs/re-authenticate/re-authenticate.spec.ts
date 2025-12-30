import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReAuthenticate } from './re-authenticate';

describe('ReAuthenticate', () => {
  let component: ReAuthenticate;
  let fixture: ComponentFixture<ReAuthenticate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReAuthenticate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReAuthenticate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
