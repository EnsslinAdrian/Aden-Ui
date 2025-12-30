import { TestBed } from '@angular/core/testing';

import { RandomMessage } from './random-message';

describe('RandomMessage', () => {
  let service: RandomMessage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomMessage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
