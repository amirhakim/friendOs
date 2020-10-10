import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/models/friend/friend.model';
import { FriendState } from '../store/reducer/friend.reducer';
import {select, Store} from '@ngrx/store';
import { selectFriend } from '../store/selector/friend.selectors';

@Component({
  selector: 'app-friend-view',
  templateUrl: './friend-view.component.html',
  styleUrls: ['./friend-view.component.scss']
})
export class FriendViewComponent implements OnInit {

  friends$: Observable<Friend[]>;

  constructor(private store: Store<FriendState>) {
    this.friends$ = this.store.pipe(select(selectFriend))
  }

  ngOnInit(): void {
  }

}
