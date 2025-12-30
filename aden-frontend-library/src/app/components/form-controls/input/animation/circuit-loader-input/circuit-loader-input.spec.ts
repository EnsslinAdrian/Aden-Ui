import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitLoaderInput } from './circuit-loader-input';

describe('CircuitLoaderInput', () => {
  let component: CircuitLoaderInput;
  let fixture: ComponentFixture<CircuitLoaderInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircuitLoaderInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircuitLoaderInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
