import { TestBed } from '@angular/core/testing';

import { JsonLd } from './json-ld';

describe('JsonLd', () => {
  let service: JsonLd;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonLd);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
