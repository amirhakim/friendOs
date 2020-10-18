import { Contact } from '../contact/contact.model';

export class Friend {
    id? = '';
    name? = '';
    age? = 0;
    weight? = 0;
}

export class FriendResolved {
    friend: Friend ;
    contacts: Contact[];
    others: Contact[];
    error?: any;
}