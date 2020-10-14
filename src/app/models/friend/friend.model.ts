export class Friend {
    id? = '';
    name? = '';
    friends? = [];
    age? = 0;
    weight? = 0;
}

export class FriendResolved {
    friend: Friend;
    error?: any;
}