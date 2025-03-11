import { TestBed } from '@angular/core/testing';

import { PoroductsService } from './poroducts.service';

describe('PoroductsService', () => {
  let service: PoroductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoroductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
