import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { concatMap, map, startWith } from 'rxjs/operators';
import { Contact } from 'src/app/models/contact/contact.model';
import { Friend } from 'src/app/models/friend/friend.model';
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

  // @Input() contactsIn: Contact[];
  @Output() contactsOut: EventEmitter<Contact[]> = new EventEmitter<Contact[]>()
  @Input() contactsAvailable: Friend[]
  @Input() contactsSelected: Friend[]
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
      })))
      })
    ).forEach(v => console.log(v))



  }

  remove(contact: Friend): void {
    this.contactsSelected = this.contactsSelected.filter(c => c.id !== contact.id)
    this.contactsAvailable.push(contact)
    this.contactsOut.emit(this.contactsSelected)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.contactsSelected.push(event.option.value)
    this.contactsAvailable = this.contactsAvailable.filter(c => c.id !== event.option.value.id);
    this.contactInput.nativeElement.value = '';
    this.contactCtrl.setValue(null);
    this.contactsOut.emit(this.contactsSelected)
  }
}
