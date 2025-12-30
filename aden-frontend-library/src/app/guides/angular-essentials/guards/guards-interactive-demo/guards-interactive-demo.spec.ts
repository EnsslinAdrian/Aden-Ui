import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardsInteractiveDemo } from './guards-interactive-demo';

describe('GuardsInteractiveDemo', () => {
  let component: GuardsInteractiveDemo;
  let fixture: ComponentFixture<GuardsInteractiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardsInteractiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardsInteractiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
