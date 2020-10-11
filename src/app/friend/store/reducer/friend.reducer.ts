import { Action, createReducer, on } from '@ngrx/store';
import { Contact } from 'src/app/models/contact/contact.model';
import { Friend } from 'src/app/models/friend/friend.model';
import * as FriendActions from '../action/friend.actions'


export const friendFeatureKey = 'friend';

export interface FriendState {
  friends: Friend[];
  contacts: Contact[];
}

export const initialFriendState: FriendState = {
  friends: [{id:'one',name:'one'},{id:'two',name:'two'},{id:'three',name:'three'}],
  contacts: [{id:'c1',fromId:'one',toId:'two'},{id:'c2',fromId:'one',toId:'three'}]
};


export const friendReducer = createReducer(
  initialFriendState,
  on(FriendActions.addFriends,
    (state: FriendState, {friend}) =>
    ({
      ...state,
      friends: [...state.friends, {...friend, id: (((1+Math.random())*0x10000)|0).toString(16).substring(1)}]
    })
    ),
    on(FriendActions.deleteFriends,
      (state: FriendState, {friend}) =>
      ({
        ...state,
        friends: state.friends.filter(f => f.id !== friend.id)
      })
      )
);

export function reducer(state: FriendState | undefined, action: Action): any {
  return friendReducer(state, action);
}
