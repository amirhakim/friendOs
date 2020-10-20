import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from 'src/app/models/contact/contact.model';
import { Friend } from 'src/app/models/friend/friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor() { }

  updateFriend(friend: Friend): Observable<Friend> {
    return of(friend)
  }

  updateContact(contact: Contact): Observable<Contact> {
    return of(contact)
  }

}
