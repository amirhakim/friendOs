import { Action, createReducer, on } from '@ngrx/store';
import { Friend } from 'src/app/models/friend/friend.model';
import * as FriendActions from '../action/friend.actions'


export const friendFeatureKey = 'friend';

export interface FriendState {
  friends: Friend[];
}

export const initialFriendState: FriendState = {
  friends: []
};


export const friendReducer = createReducer(
  initialFriendState,
  on(FriendActions.addFriends,
    (state: FriendState, {friend}) =>
    ({
      ...state,
      friends: [...state.friends, friend]
    })
    )
);

export function reducer(state: FriendState | undefined, action: Action): any {
  return friendReducer(state, action);
}
