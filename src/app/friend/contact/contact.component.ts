import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/models/friend/friend.model';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { Store, select } from '@ngrx/store';
import { FriendState } from '../store/reducer/friend.reducer';
import { selectFriend } from '../store/selector/friend.selectors';
import { selectContacts } from '../store/selector/friend.selectors';
import { addContact, deleteContact } from '../store/action/friend.actions';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Contact } from 'src/app/models/contact/contact.model';
import { map, catchError, filter, take, startWith } from 'rxjs/operators';



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
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Input() friendId: string;
  @Output() contacts: EventEmitter<string[]> = new EventEmitter<string[]>()

  constructor() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : setMinusSet(this.allFruits,this.fruits).slice()));
  }
  ngOnInit(): void {
    console.log("CONTACT Comp: ", this.friendId)
  }

  add(event: MatChipInputEvent): void {
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.contacts.emit(this.fruits);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.contacts.emit(this.fruits)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return setMinusSet(this.allFruits,this.fruits).filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}

function setMinusSet(a: string[], b: string[]): string[] {
  return a.filter(ael => !b.map(bel => bel.toLowerCase()).includes(ael.toLowerCase()))
}

// constructor(
//   public formBuilder: FormBuilder,
//   private store: Store<FriendState>
// ) { 

// }

  // friends$: Observable<Friend[]>;
  // contacts$: Observable<Contact[]>;
  // @Input() friendId: string;
  // @Output() contacts: EventEmitter<string[]> = new EventEmitter<string[]>()
    // this.friends$ = this.store.pipe(select(selectFriend))
    // this.contacts$ = this.store.pipe(
    //   select(selectContacts),
    //   map(xr => xr.filter(ct => ct.fromId===this.friendId || ct.toId===this.friendId))
    //   );