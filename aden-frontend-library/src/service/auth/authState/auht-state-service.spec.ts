import { TestBed } from '@angular/core/testing';

import { AuhtStateService } from './auht-state-service';

describe('AuhtStateService', () => {
  let service: AuhtStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuhtStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
