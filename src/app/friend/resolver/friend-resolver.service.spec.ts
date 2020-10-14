import { TestBed } from '@angular/core/testing';

import { FriendResolverService } from './friend-resolver.service';

describe('FriendResolverService', () => {
  let service: FriendResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
