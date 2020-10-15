import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/models/friend/friend.model';
import { FriendState } from '../store/reducer/friend.reducer';
import {select, Store} from '@ngrx/store';
import { selectFriend } from '../store/selector/friend.selectors';
import { deleteFriends } from '../store/action/friend.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-friend-view',
  templateUrl: './friend-view.component.html',
  styleUrls: ['./friend-view.component.scss']
})
export class FriendViewComponent implements OnInit {

  friends$: Observable<Friend[]>;

  constructor(
    private store: Store<FriendState>,
    private router: Router
    ) {
    this.friends$ = this.store.pipe(select(selectFriend))
  }

  ngOnInit(): void {
  }

  delete(friend: Friend) {
    console.log('deleting', friend);
    this.store.dispatch(deleteFriends(friend))
  }

  edit(friend: Friend) {
    this.router.navigate([friend.id,'detail']);
  }

}
