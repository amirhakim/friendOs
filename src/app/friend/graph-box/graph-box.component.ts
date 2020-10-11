import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { Contact } from 'src/app/models/contact/contact.model';
import { Friend } from 'src/app/models/friend/friend.model';
import { selectFriend, selectContacts } from '../store/selector/friend.selectors';
import { FriendState } from '../store/reducer/friend.reducer';
import {select, Store} from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


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
