import { TestBed } from '@angular/core/testing';

import { DictamenService } from './dictamen.service';

describe('DictamenService', () => {
  let service: DictamenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictamenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
