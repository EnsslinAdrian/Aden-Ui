import { TestBed } from '@angular/core/testing';

import { ComponentInteraction } from './component-interaction';

describe('ComponentInteraction', () => {
  let service: ComponentInteraction;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentInteraction);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
