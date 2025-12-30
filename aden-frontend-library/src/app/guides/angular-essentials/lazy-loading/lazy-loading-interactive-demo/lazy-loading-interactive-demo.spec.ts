import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoadingInteractiveDemo } from './lazy-loading-interactive-demo';

describe('LazyLoadingInteractiveDemo', () => {
  let component: LazyLoadingInteractiveDemo;
  let fixture: ComponentFixture<LazyLoadingInteractiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyLoadingInteractiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazyLoadingInteractiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
