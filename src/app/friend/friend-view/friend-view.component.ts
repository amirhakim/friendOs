import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/models/friend/friend.model';
import { FriendState } from '../store/reducer/friend.reducer';
import {select, Store} from '@ngrx/store';
import { selectFriend } from '../store/selector/friend.selectors';
import { deleteFriends, upsertFriends } from '../store/action/friend.actions';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-friend-view',
  templateUrl: './friend-view.component.html',
  styleUrls: ['./friend-view.component.scss']
})
export class FriendViewComponent implements OnInit {

  friends$: Observable<Friend[]>;
  adding$: Observable<boolean>;

  constructor(
    private store: Store<FriendState>,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.friends$ = this.store.pipe(select(selectFriend))
    this.adding$ = this.friends$.pipe(
      map(fo => fo.some(fr => !fr.name))
    )
  }

  delete(friend: Friend) {
    console.log('deleting', friend);
    this.store.dispatch(deleteFriends(friend))
  }

  edit(friend: Friend) {
    this.router.navigate([friend.id,'detail']);
  }

  create() {
    this.store.dispatch(upsertFriends({}))
  }

}
