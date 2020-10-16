import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Friend, FriendResolved } from 'src/app/models/friend/friend.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Store} from '@ngrx/store';
import { FriendState } from '../store/reducer/friend.reducer';
import { addFriends, editFriends } from '../store/action/friend.actions';





@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  friend: Friend;
  friendId: string;
  error: string;
  addFrndForm: FormGroup;
  nameRegex = /^[a-zA-Z]/;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<FriendState>
    ) { }

  ngOnInit(): void {
    this.addFrndForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(this.nameRegex)]],
      friends: [null, [Validators.required]],
      age: [null, [Validators.required]],
      weight: [null, [Validators.required]]
    });
    const resolvedData: FriendResolved = this.route.snapshot.data['resolvedFriend'];
    this.friend = resolvedData.friend;
    this.error = resolvedData.error;
    if(this.friend) {
      this.friendId = this.friend.id;
      this.addFrndForm.get('name').setValue(this.friend.name);
      this.addFrndForm.get('friends').setValue(this.friend.name);
      this.addFrndForm.get('age').setValue(this.friend.name);
      this.addFrndForm.get('weight').setValue(this.friend.name);
    }
  }

  submit() {
    if(!this.addFrndForm.valid){
      return;
    }
    console.log(this.addFrndForm.value);
    const newFriend = this.addFrndForm.value;
    if(this.friend) {
      this.store.dispatch(editFriends({id: this.friend.id, ...newFriend}))
    } else {
      this.store.dispatch(addFriends(newFriend))
    }
  }

  onContactsUpdate(contactsId: string[]) {
    console.log("FRIEND COMP: ", contactsId)
  }

}
