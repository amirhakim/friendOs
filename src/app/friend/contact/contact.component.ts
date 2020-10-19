import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { concatMap, map, startWith, take } from 'rxjs/operators';
import { Friend } from 'src/app/models/friend/friend.model';
import { addContact, deleteContact } from '../store/action/friend.actions';
import { FriendState } from '../store/reducer/friend.reducer';
import { selectContactById, selectFriend } from '../store/selector/friend.selectors';




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA ];
  contactCtrl = new FormControl();

  @ViewChild('contactInput') contactInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  contactsAvailable: Friend[]
  contactsSelected: Friend[]
  contactsFiltered: Observable<Friend[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<FriendState>,
  ) {

    this.contactsFiltered = this.contactCtrl.valueChanges.pipe(
      startWith(null),
      map((name: Friend | string | null) => {
        let res =  (name ? 
      this.contactsAvailable.filter(c => c.name.toLowerCase()
        .indexOf(typeof name === "string" ? name.toLowerCase() : name.name.toLowerCase())===0)
      : this.contactsAvailable);
    
      return res;
    })
    )
  }

  ngOnInit(): void {
    console.debug("contact.component init")

    this.route.params.pipe(
      concatMap(id => {
      return  combineLatest([
        this.store.pipe(select(selectFriend)), 
        this.store.pipe(select(selectContactById, id.id))
      ]).pipe(
      map((fc) => ({
        contacts:fc[1]
          .reduce((acc,cur) => acc.concat(cur.fromId === id.id ? cur.toId : cur.fromId), [])
          .map(c => (fc[0].filter(f => f.id === c)[0])),
        others:fc[0].filter(f => 
          !(fc[1].reduce((acc,cur) => acc.concat(cur.fromId === id.id ? cur.toId : cur.fromId), [])
            .concat(id.id)
            .includes(f.id))), 
      })),take(1))
      })
    ).forEach(v => {
      this.contactsSelected = v.contacts
      this.contactsAvailable = v.others
    })

  }

  remove(contact: Friend): void {
    this.route.params.forEach(param => {
      this.contactsSelected = this.contactsSelected.filter(c => c.id !== contact.id)
      this.contactsAvailable.push(contact)
      this.store.dispatch(deleteContact({fromId: contact.id, toId: param.id}))
    })
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.route.params.forEach(param => {
      this.contactsSelected.push(event.option.value)
      this.contactsAvailable = this.contactsAvailable.filter(c => c.id !== event.option.value.id);
      this.contactInput.nativeElement.value = '';
      this.contactCtrl.setValue(null);
      this.store.dispatch(addContact({fromId: param.id, toId:event.option.value.id}))
    })
  }
}
