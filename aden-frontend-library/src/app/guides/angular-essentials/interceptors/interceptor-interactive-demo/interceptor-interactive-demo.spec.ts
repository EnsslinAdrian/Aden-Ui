import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterceptorInteractiveDemo } from './interceptor-interactive-demo';

describe('InterceptorInteractiveDemo', () => {
  let component: InterceptorInteractiveDemo;
  let fixture: ComponentFixture<InterceptorInteractiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterceptorInteractiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterceptorInteractiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
