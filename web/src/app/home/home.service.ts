import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../Model/User';
import { Conversation } from '../Model/Conversation';
import { DisplayMessage } from '../Model/DisplayMessage';
import { Friend } from '../Model/friend';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private userService: UserService) {}

  public loadUserImages(users: User[]) {
    users.map((user) => {
      const url = user.imagePath;
      this.userService.getImage(url).subscribe(
        (imageBlob: Blob) => {
          user.imagePath = URL.createObjectURL(imageBlob);
        },
        (error) => {
          console.log(error);
        }
      );
    });
    return users;
  }

  public createUser(person: User) {
    return new User(
      person.id,
      person.first_name,
      person.last_name,
      person.username,
      person.imagePath,
      person.status,
      []
    );
  }

  // private loadUserFriends(
  //   users: User[],
  //   person: User,
  //   friends: Friend[],
  //   user: User
  // ) {
  //   this.userService.getConversation().subscribe((response) => {
  //     console.log(response);
  //     users.map((user) => {
  //       const conversation = response.find(
  //         (conversation) =>
  //           conversation.members.includes(user.id) &&
  //           conversation.members.includes(person.id)
  //       ) as Conversation;
  //       const disscusion: DisplayMessage[] = [];
  //       const friend = new Friend(
  //         user.id,
  //         user.first_name,
  //         user.last_name,
  //         user.imagePath,
  //         true,
  //         disscusion,
  //         conversation
  //       );
  //       friends.push(friend);
  //     });
  //     user.friends = friends;
  //   });
  // }
}
