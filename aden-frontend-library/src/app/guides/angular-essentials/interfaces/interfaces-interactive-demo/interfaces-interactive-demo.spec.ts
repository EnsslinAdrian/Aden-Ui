import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacesInteractiveDemo } from './interfaces-interactive-demo';

describe('InterfacesInteractiveDemo', () => {
  let component: InterfacesInteractiveDemo;
  let fixture: ComponentFixture<InterfacesInteractiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterfacesInteractiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfacesInteractiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
