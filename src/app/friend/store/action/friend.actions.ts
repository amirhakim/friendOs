import { createAction, props } from '@ngrx/store';
import { Friend } from 'src/app/models/friend/friend.model';

export const addFriends = createAction(
  '[Friend] Add Friend',
  (friend: Friend) => ({friend})
);

export const deleteFriends = createAction(
  '[Friend] Delete Friend',
  (friend: Friend) => ({friend})
);



