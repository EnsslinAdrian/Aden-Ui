import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickStartSection } from './quick-start-section';

describe('QuickStartSection', () => {
  let component: QuickStartSection;
  let fixture: ComponentFixture<QuickStartSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickStartSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickStartSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
