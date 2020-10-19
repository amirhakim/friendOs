import { createFeatureSelector, createSelector } from '@ngrx/store';
import { constants } from 'buffer';
import * as fromFriend from '../reducer/friend.reducer'

export const selectFriendState = createFeatureSelector<fromFriend.FriendState>(
    fromFriend.friendFeatureKey
);

export const selectFriend = createSelector(
    selectFriendState,
    (state: fromFriend.FriendState) => state.friends
)

export const selectFriendById = createSelector(
    selectFriendState,
    (state: fromFriend.FriendState, id: string) => state.friends.filter(f => f.id === id)
)

export const selectContacts = createSelector(
    selectFriendState,
    (state: fromFriend.FriendState) => state.contacts
)

export const selectContactById = createSelector(
    selectFriendState,
    (state: fromFriend.FriendState, id: string) => 
    state.contacts.filter(c => c.fromId === id || c.toId ===id)
)

export const selectSelectFriend = createSelector(
    selectFriendState,
    (state: fromFriend.FriendState) => state.selectFriend
)

export const selectSelectContacts = createSelector(
    selectFriendState,
    (state: fromFriend.FriendState) => state.selectContacts
)