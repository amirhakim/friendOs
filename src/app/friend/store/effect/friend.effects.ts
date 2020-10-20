import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { Friend } from 'src/app/models/friend/friend.model';
import { FriendService } from '../../service/friend.service';
import { upsertFriends, addFriends, upsertFriendsApi } from '../action/friend.actions';



@Injectable()
export class FriendEffects {
  constructor(
    private actions$: Actions,
    private friendService: FriendService
    ) {}

  updateFriend$ = createEffect(() => 
    this.actions$.pipe(
      ofType(upsertFriendsApi),
      concatMap(action => 
        this.friendService.updateFriend(action.friend)
        .pipe(
          map(fr => addFriends(fr)),
          catchError(er => of(addFriends(<Friend>{}))
        )
      )
    )
  ))
}
