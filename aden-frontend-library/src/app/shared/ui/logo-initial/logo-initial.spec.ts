import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoInitial } from './logo-initial';

describe('LogoInitial', () => {
  let component: LogoInitial;
  let fixture: ComponentFixture<LogoInitial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoInitial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoInitial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
