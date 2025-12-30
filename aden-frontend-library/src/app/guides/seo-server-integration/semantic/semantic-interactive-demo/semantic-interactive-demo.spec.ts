import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticInteractiveDemo } from './semantic-interactive-demo';

describe('SemanticInteractiveDemo', () => {
  let component: SemanticInteractiveDemo;
  let fixture: ComponentFixture<SemanticInteractiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemanticInteractiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemanticInteractiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
