import * as fromFriend from './friend.actions';

describe('loadFriends', () => {
  it('should return an action', () => {
    expect(fromFriend.loadFriends().type).toBe('[Friend] Load Friends');
  });
});
