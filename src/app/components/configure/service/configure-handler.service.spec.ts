import { TestBed } from '@angular/core/testing';

import { ConfigureHandlerService } from './configure-handler.service';

describe('ConfigureHandlerService', () => {
  let service: ConfigureHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigureHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
