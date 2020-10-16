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
import { FriendComponent } from './friend/friend.component';
import { RouterModule } from '@angular/router';
import { FriendResolverService } from './resolver/friend-resolver.service';
import { ContactComponent } from './contact/contact.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';




@NgModule({
  declarations: [FriendViewComponent, FriendAddComponent, GraphComponent, GraphBoxComponent, FriendComponent, ContactComponent],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    CommonModule,
    StoreModule.forFeature(friendFeatureKey, reducer),
    RouterModule.forChild([
      {
        path: '',
        component: FriendViewComponent
      },
      {
        path: ':id/detail',
        component: FriendComponent,
        resolve: { resolvedFriend: FriendResolverService}
      },
      {
        path: 'graph',
        component : GraphBoxComponent
      },
      {
        path: 'edit',
        component : FriendAddComponent
      }
    ])
  ]
})
export class FriendModule { }
