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

export const selectContacts = createSelector(
    selectFriendState,
    (state: fromFriend.FriendState) => state.contacts
)