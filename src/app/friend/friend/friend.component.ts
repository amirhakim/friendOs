import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Friend, FriendResolved } from 'src/app/models/friend/friend.model';


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  friend: Friend;
  error: string;

  constructor(private route: ActivatedRoute) { 
    console.log("Friend Comp crx")
  }

  ngOnInit(): void {
    console.log("Friend Comp init")

    const resolvedData: FriendResolved = this.route.snapshot.data['resolvedFriend'];
    this.friend = resolvedData.friend;
    this.error = resolvedData.error;

    console.log(this.friend, this.error);
  }

}
