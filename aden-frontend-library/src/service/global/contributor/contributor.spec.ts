import { TestBed } from '@angular/core/testing';

import { Contributor } from './contributor';

describe('Contributor', () => {
  let service: Contributor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contributor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
