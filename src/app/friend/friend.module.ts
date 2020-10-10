import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { FriendViewComponent } from './friend-view/friend-view.component';
import { FriendAddComponent } from './friend-add/friend-add.component';
import { StoreModule } from '@ngrx/store';
import { friendFeatureKey, reducer } from './store/reducer/friend.reducer';



@NgModule({
  declarations: [FriendViewComponent, FriendAddComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
    StoreModule.forFeature(friendFeatureKey, reducer)
  ],
  exports: [
    FriendViewComponent,
    FriendAddComponent
  ]
})
export class FriendModule { }
