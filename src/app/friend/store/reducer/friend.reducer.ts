import { Action, createReducer, on } from '@ngrx/store';
import { Contact } from 'src/app/models/contact/contact.model';
import { Friend } from 'src/app/models/friend/friend.model';
import * as FriendActions from '../action/friend.actions'


export const friendFeatureKey = 'friend';

export interface FriendState {
  friends: Friend[];
  contacts: Contact[];
  selectFriend: Friend;
  selectContacts: Friend[];
}

export const initialFriendState: FriendState = {
  friends: [{id:'one',name:'one',age:25,weight:80},{id:'two',name:'two',age:30,weight:50},{id:'three',name:'three',age:20,weight:90}],
  contacts: [{id:'c1',fromId:'one',toId:'two'},{id:'c2',fromId:'one',toId:'three'}],
  selectFriend: null,
  selectContacts: null
};


export const friendReducer = createReducer(
  initialFriendState,
  on(FriendActions.upsertFriends,
    (state: FriendState, {friend}) =>
    ({
      ...state,
      friends: [
        ...(state.friends.filter(f => f.id !== friend.id)),
        (state.friends.some(f => f.id == friend.id)) ? 
          {...state.friends.find(f => f.id == friend.id), ...friend} : 
          {...friend, id: (((1+Math.random())*0x10000)|0).toString(16).substring(1)}
      ]
    })
    ),
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
      friends: state.friends.filter(f => f.id !== friend.id),
      contacts: state.contacts.filter(c => c.fromId !== friend.id && c.toId !== friend.id)
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
      contacts: state.contacts.filter(c => 
        !(c.fromId === contact.fromId && c.toId === contact.toId) &&
        !(c.fromId === contact.toId && c.toId === contact.fromId)
        )
    })
    ),
  on(FriendActions.upsertSelectFriend,
    (state: FriendState, {selected}) =>
    ({
      ...state,
      selectFriend: {...state.selectFriend, ...selected}
    })
    ),
  on(FriendActions.clearSelectFriend,
    (state: FriendState, {}) =>
    ({
      ...state,
      selectFriend: null
    })
    ),
  on(FriendActions.upsertSelectContacts,
    (state: FriendState, {selected}) =>
    ({
      ...state,
      selectContacts: selected
    })
    ),
  on(FriendActions.clearSelectContacts,
    (state: FriendState, {}) =>
    ({
      ...state,
      selectContacts: null
    })
    )
);

export function reducer(state: FriendState | undefined, action: Action): any {
  return friendReducer(state, action);
}

