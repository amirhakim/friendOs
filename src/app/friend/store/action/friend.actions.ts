import { createAction, props } from '@ngrx/store';
import { Contact } from 'src/app/models/contact/contact.model';
import { Friend } from 'src/app/models/friend/friend.model';

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

export const deleteContact = createAction(
  '[Friend] delete Contact',
  (contact: Contact) => ({contact})
);
