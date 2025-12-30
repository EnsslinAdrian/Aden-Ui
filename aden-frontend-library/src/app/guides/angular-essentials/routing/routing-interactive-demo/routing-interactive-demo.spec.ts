import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingInteractiveDemo } from './routing-interactive-demo';

describe('RoutingInteractiveDemo', () => {
  let component: RoutingInteractiveDemo;
  let fixture: ComponentFixture<RoutingInteractiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingInteractiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingInteractiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
