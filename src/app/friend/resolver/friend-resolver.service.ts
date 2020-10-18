import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { map, catchError, filter, take } from 'rxjs/operators';
import { Friend } from 'src/app/models/friend/friend.model';
import { FriendResolved } from 'src/app/models/friend/friend.model';
import { FriendState } from '../store/reducer/friend.reducer';
import { select, Store } from '@ngrx/store';
import { selectContactById, selectContacts, selectFriend, selectFriendById } from '../store/selector/friend.selectors';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';
import { Contact } from 'src/app/models/contact/contact.model';


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

    let friend$: Observable<Friend[]> = this.store.pipe(select(selectFriend))
    let contacts$: Observable<Contact[]> = this.store.pipe(select(selectContactById, id))

    return combineLatest([friend$, contacts$]).pipe(
      map((fc) => (<FriendResolved>{
        friend:fc[0].filter(f => f.id === id)[0],
        contacts:fc[1]
          .reduce((acc,cur) => acc.concat(cur.fromId === id ? cur.toId : cur.fromId), [])
          .map(c => (fc[0].filter(f => f.id === c)[0])),
        others:fc[0].filter(f => 
          !(fc[1].reduce((acc,cur) => acc.concat(cur.fromId === id ? cur.toId : cur.fromId), [])
            .concat(id)
            .includes(f.id))), 
        error: null
      })),
      take(1),
      catchError(err => of(<FriendResolved>{friend: null,contacts:null, others: null,error: `Retrieval error: ${err}`}))
      )
  }
}
