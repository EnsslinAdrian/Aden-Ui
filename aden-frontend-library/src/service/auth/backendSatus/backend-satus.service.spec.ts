import { TestBed } from '@angular/core/testing';

import { BackendSatusService } from './backend-satus.service';

describe('BackendSatusService', () => {
  let service: BackendSatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendSatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
