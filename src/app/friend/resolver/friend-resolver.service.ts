import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, filter, take } from 'rxjs/operators';
import { Friend } from 'src/app/models/friend/friend.model';
import { FriendResolved } from 'src/app/models/friend/friend.model';
import { FriendState } from '../store/reducer/friend.reducer';
import {select, Store} from '@ngrx/store';
import { selectFriend, selectFriendById } from '../store/selector/friend.selectors';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';


@Injectable({
  providedIn: 'root'
})
export class FriendResolverService implements Resolve<FriendResolved> {

  constructor(private store: Store<FriendState>) { 
    console.log("Friend Resolver Loaded")
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FriendResolved> {
    let id = route.paramMap.get('id');
    console.log("Friend Resolver Loaded: id ", id)
    return this.store.pipe(
      select(selectFriendById,id),
      map(f => (<FriendResolved>{friend:f[0],error: null})
      ),
      take(1),
      catchError(err => of(<FriendResolved>{friend: null,error: `Retrieval error: ${err}`}))
    )

  }
}
