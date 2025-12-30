import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaInteractiveDemo } from './meta-interactive-demo';

describe('MetaInteractiveDemo', () => {
  let component: MetaInteractiveDemo;
  let fixture: ComponentFixture<MetaInteractiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaInteractiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetaInteractiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
