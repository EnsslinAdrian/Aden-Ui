import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsrInteractiveDemo } from './ssr-interactive-demo';

describe('SsrInteractiveDemo', () => {
  let component: SsrInteractiveDemo;
  let fixture: ComponentFixture<SsrInteractiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsrInteractiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsrInteractiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
