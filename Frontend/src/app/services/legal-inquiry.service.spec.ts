import { TestBed } from '@angular/core/testing';

import { LegalInquiryService } from './legal-inquiry.service';

describe('LegalInquiryService', () => {
  let service: LegalInquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalInquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
