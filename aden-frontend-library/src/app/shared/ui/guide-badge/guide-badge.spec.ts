import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideBadge } from './guide-badge';

describe('GuideBadge', () => {
  let component: GuideBadge;
  let fixture: ComponentFixture<GuideBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
