import { TestBed } from '@angular/core/testing';

import { BaseEndpointService } from './base-endpoint.service';

describe('BaseEndpointService', () => {
  let service: BaseEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
