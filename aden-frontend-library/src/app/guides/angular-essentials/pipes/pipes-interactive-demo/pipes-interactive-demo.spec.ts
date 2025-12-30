import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesInteractiveDemo } from './pipes-interactive-demo';

describe('PipesInteractiveDemo', () => {
  let component: PipesInteractiveDemo;
  let fixture: ComponentFixture<PipesInteractiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesInteractiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipesInteractiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
