import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSettings } from './header-settings';

describe('HeaderSettings', () => {
  let component: HeaderSettings;
  let fixture: ComponentFixture<HeaderSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
