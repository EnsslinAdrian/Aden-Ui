import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProBadge } from './pro-badge';

describe('ProBadge', () => {
  let component: ProBadge;
  let fixture: ComponentFixture<ProBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
