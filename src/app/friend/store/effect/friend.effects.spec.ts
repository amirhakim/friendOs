import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FriendEffects } from './friend.effects';

describe('FriendEffects', () => {
  let actions$: Observable<any>;
  let effects: FriendEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FriendEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FriendEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
