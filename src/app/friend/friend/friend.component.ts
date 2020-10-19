import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { concatMap, debounceTime, filter, map } from 'rxjs/operators';
import { upsertFriends } from '../store/action/friend.actions';
import { FriendState } from '../store/reducer/friend.reducer';
import { selectFriend } from '../store/selector/friend.selectors';



@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  addFrndForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<FriendState>
    ) { }

  ngOnInit(): void {
    this.addFrndForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i), Validators.minLength(2), Validators.maxLength(60)]],
      age: [null, [Validators.required, Validators.min(6), Validators.max(120)]],
      weight: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    this.route.params.pipe(
      concatMap(param => this.store.pipe(select(selectFriend)).pipe(map(fa => fa.find(fr => fr.id === param.id)))),
    ).forEach(iv => {
      if(iv) {
        Object.keys(this.addFrndForm.controls)
        .filter(ck =>this.addFrndForm.get(ck).value !== iv[ck])
        .forEach(fv =>this.addFrndForm.get(fv).setValue(iv[fv]))
      }
    })

    this.addFrndForm.valueChanges.pipe(
      debounceTime(501),
      filter(nv => this.addFrndForm.valid),
      concatMap(nv => 
        this.route.params.pipe(map(param => ({id: param.id, ...nv}))))
    ).forEach(v => 
      this.store.dispatch(upsertFriends(v))
    )

  }

}
