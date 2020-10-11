import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendAddComponent } from './friend/friend-add/friend-add.component';
import { FriendViewComponent } from './friend/friend-view/friend-view.component';
import { GraphComponent } from './friend/graph/graph.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: FriendViewComponent },
  { path: 'list', component: FriendViewComponent },
  { path: 'add', component: FriendAddComponent },
  { path: 'graph', component: GraphComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
