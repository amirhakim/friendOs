import { createAction, props } from '@ngrx/store';
import { Contact } from 'src/app/models/contact/contact.model';
import { Friend } from 'src/app/models/friend/friend.model';

export const upsertFriends = createAction(
  '[Friend] Upsert Friend',
  (friend: Friend) => ({friend})
);

export const upsertFriendsApi = createAction(
  '[Friend-API] Upsert Friend',
  (friend: Friend) => ({friend})
);

export const addFriends = createAction(
  '[Friend] Add Friend',
  (friend: Friend) => ({friend})
);

export const editFriends = createAction(
  '[Friend] Edit Friend',
  (friend: Friend) => ({friend})
);

export const deleteFriends = createAction(
  '[Friend] Delete Friend',
  (friend: Friend) => ({friend})
);

export const addContact = createAction(
  '[Friend] Add Contact',
  (contact: Contact) => ({contact})
);

export const editContact = createAction(
  '[Friend] Edit Contact',
  (contact: Contact, id: string) => ({contact})
);

export const deleteContact = createAction(
  '[Friend] Delete Contact',
  (contact: Contact) => ({contact})
);

export const upsertSelectFriend = createAction(
  '[Friend] Upsert Selected Friend',
  (selected: Friend) => ({selected})
)

export const clearSelectFriend = createAction(
  '[Friend] Clear Selected Friend',
  () => ({})
)

export const upsertSelectContacts = createAction(
  '[Friend] Upsert Selected Contact',
  (selected: Friend[]) => ({selected})
)

export const clearSelectContacts = createAction(
  '[Friend] Clear Selected Contact',
  () => ({})
)