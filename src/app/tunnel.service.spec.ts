import { TestBed } from '@angular/core/testing';

import { TunnelService } from './tunnel.service';

describe('TunnelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TunnelService = TestBed.get(TunnelService);
    expect(service).toBeTruthy();
  });
});
