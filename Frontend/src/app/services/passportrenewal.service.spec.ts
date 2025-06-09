import { TestBed } from '@angular/core/testing';

import { PassportrenewalService } from './passportrenewal.service';

describe('PassportrenewalService', () => {
  let service: PassportrenewalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassportrenewalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
