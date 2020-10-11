import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { FriendViewComponent } from './friend-view/friend-view.component';
import { FriendAddComponent } from './friend-add/friend-add.component';
import { StoreModule } from '@ngrx/store';
import { friendFeatureKey, reducer } from './store/reducer/friend.reducer';
import { GraphComponent } from './graph/graph.component';
import { GraphBoxComponent } from './graph-box/graph-box.component';



@NgModule({
  declarations: [FriendViewComponent, FriendAddComponent, GraphComponent, GraphBoxComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    CommonModule,
    StoreModule.forFeature(friendFeatureKey, reducer)
  ],
  exports: [
    FriendViewComponent,
    FriendAddComponent,
    GraphComponent
  ]
})
export class FriendModule { }
