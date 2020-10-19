import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact/contact.model';
import { Friend } from 'src/app/models/friend/friend.model';
import { FriendState } from '../store/reducer/friend.reducer';
import { selectContacts, selectFriend } from '../store/selector/friend.selectors';


@Component({
  selector: 'app-graph-box',
  templateUrl: './graph-box.component.html',
  styleUrls: ['./graph-box.component.scss']
})
export class GraphBoxComponent implements OnInit {

  friends$: Observable<Friend[]>;
  contacts$: Observable<Contact[]>;

  constructor(
    private store: Store<FriendState>
  ) {
    this.friends$ = this.store.pipe(select(selectFriend));
    this.contacts$ = this.store.pipe(select(selectContacts));
  }

  ngOnInit(): void {
  }
  stringify = JSON.stringify

}
