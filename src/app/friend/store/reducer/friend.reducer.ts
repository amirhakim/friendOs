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
  friends: [{id:'one',name:'one',age:25,weight:80},{id:'two',name:'two',age:30,weight:50},{id:'three',name:'three',age:20,weight:90}],
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
  on(FriendActions.editFriends,
    (state: FriendState, {friend}) =>
    ({
      ...state,
      friends: [...(state.friends.filter(f => f.id !== friend.id)), friend]
    })
    ),
  on(FriendActions.deleteFriends,
    (state: FriendState, {friend}) =>
    ({
      ...state,
      friends: state.friends.filter(f => f.id !== friend.id)
    })
    ),
  on(FriendActions.addContact,
    (state: FriendState, {contact}) =>
    ({
      ...state,
      contacts: [...state.contacts, {...contact, id: (((1+Math.random())*0x10000)|0).toString(16).substring(1)}]
    })
    ),
  on(FriendActions.editContact,
    (state: FriendState, {contact}) =>
    ({
      ...state,
      contacts: [...state.contacts.filter(c => c.id !== contact.id), contact]
    })
    ),
  on(FriendActions.deleteContact,
    (state: FriendState, {contact}) =>
    ({
      ...state,
      contacts: state.contacts.filter(c => !(c.fromId === contact.fromId && c.toId === contact.toId))
    })
    )
);

export function reducer(state: FriendState | undefined, action: Action): any {
  return friendReducer(state, action);
}
