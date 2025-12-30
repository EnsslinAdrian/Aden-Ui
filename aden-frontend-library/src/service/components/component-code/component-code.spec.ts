import { TestBed } from '@angular/core/testing';

import { ComponentCode } from './component-code';

describe('ComponentCode', () => {
  let service: ComponentCode;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentCode);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
