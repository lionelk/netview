import { TestBed } from '@angular/core/testing';

import { NeService } from './ne.service';

describe('NeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NeService = TestBed.get(NeService);
    expect(service).toBeTruthy();
  });
});
