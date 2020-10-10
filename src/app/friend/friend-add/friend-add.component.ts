import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Store} from '@ngrx/store';
import { addFriends } from '../store/action/friend.actions';
import { FriendState } from '../store/reducer/friend.reducer';


@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.scss']
})
export class FriendAddComponent implements OnInit {

  addFrndForm: FormGroup;
  nameRegex = /^[a-zA-Z]/;

  constructor(
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
  }

  submit() {
    if(!this.addFrndForm.valid){
      return;
    }
    console.log(this.addFrndForm.value);
    const newFriend = this.addFrndForm.value;
    this.store.dispatch(addFriends(newFriend))
  }

}
