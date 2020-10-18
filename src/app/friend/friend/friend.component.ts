import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Friend, FriendResolved } from 'src/app/models/friend/friend.model';
import { addContact, addFriends, deleteContact, editFriends } from '../store/action/friend.actions';
import { FriendState } from '../store/reducer/friend.reducer';
import { Router } from '@angular/router';
import { debounceTime, throttle, throttleTime } from 'rxjs/operators';
import { interval } from 'rxjs';


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  friend: Friend;
  contacts: Friend[];
  originalContacts: Friend[];
  otherContacts: Friend[];
  newContacts: Friend[];
  friendId: string;
  error: string;
  addFrndForm: FormGroup;
  nameRegex = /^[a-z ,.'-]+$/i;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<FriendState>,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.addFrndForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(this.nameRegex), Validators.minLength(2), Validators.maxLength(60)]],
      age: [null, [Validators.required, Validators.min(6), Validators.max(120)]],
      weight: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    const resolvedData: FriendResolved = this.route.snapshot.data['resolvedFriend'];
    this.friend = resolvedData.friend;
    this.contacts = resolvedData.contacts;
    this.originalContacts = this.contacts.map(c=>c)
    this.otherContacts = resolvedData.others;
    this.error = resolvedData.error;
    this.newContacts = []
    if(this.friend) {
      this.friendId = this.friend.id;
      this.addFrndForm.get('name').setValue(this.friend.name);
      this.addFrndForm.get('age').setValue(this.friend.name);
      this.addFrndForm.get('weight').setValue(this.friend.name);
    }

    this.addFrndForm.valueChanges.pipe(debounceTime(501)).forEach(v => console.log("OBBB: ",v))
  }

  submit() {
    if(!this.addFrndForm.valid){
      return;
    }
    let newFriend = this.addFrndForm.value;
    let deletedContacts = this.originalContacts.filter(oc => !this.newContacts.map(nc => nc.id).includes(oc.id))
    let addedContacts = this.newContacts.filter(nc => !this.originalContacts.map(oc => oc.id).includes(nc.id))
    if(this.friend) {
      this.store.dispatch(editFriends({id: this.friend.id, ...newFriend}))
    } else {
      this.store.dispatch(addFriends(newFriend))
    }
    addedContacts.map(dc => ({fromId: this.friendId, toId: dc.id})).forEach(i => this.store.dispatch(addContact(i)))
    deletedContacts.map(dc => ({fromId: this.friendId, toId: dc.id})).forEach(i => this.store.dispatch(deleteContact(i)))
    this.router.navigate(['/']);
  }

  onContactsUpdate(updatedContacts: Friend[]) {
    console.info("friend comp: ", updatedContacts);
    this.newContacts = updatedContacts;
  }

}
