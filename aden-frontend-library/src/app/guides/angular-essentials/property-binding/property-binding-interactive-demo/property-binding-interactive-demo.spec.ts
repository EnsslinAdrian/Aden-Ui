import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBindingInteractiveDemo } from './property-binding-interactive-demo';

describe('PropertyBindingInteractiveDemo', () => {
  let component: PropertyBindingInteractiveDemo;
  let fixture: ComponentFixture<PropertyBindingInteractiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyBindingInteractiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyBindingInteractiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
