import { Component, OnInit } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { ChatComponent } from './chat/chat.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { Team } from '../Model/Team';
import { Teams, users } from '../fakeData';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../Model/User';
import { Friend } from '../Model/friend';
import { DisplayMessage } from '../Model/DisplayMessage';
import { Conversation } from '../Model/Conversation';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, ChatComponent, DiscussionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public user!: User;
  public teams: Team[] = Teams;
  public friends: Friend[] = [];
  public users!: User[];
  public disscusion!: DisplayMessage[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.paramMap.get('username');

    this.userService.getUsers().subscribe(
      (response: User[]) => {
        if (response.length > 0) {
          this.users = response;
          this.homeService.loadUserImages(this.users);

          const person = this.users.find(
            (user) => user.username === username
          ) as User;
          this.users = this.users.filter((user) => user.username !== username);

          this.user = this.homeService.createUser(person);

          this.loadUserFriends(person);
        } else {
          console.error('No user data found in the response.');
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  private loadUserFriends(person: User) {
    this.userService.getConversation().subscribe((response) => {
      console.log(response);
      this.users.map((user) => {
        const conversation = response.find(
          (conversation) =>
            conversation.members.includes(user.id) &&
            conversation.members.includes(person.id)
        ) as Conversation;
        this.disscusion = [];
        const friend = new Friend(
          user.id,
          user.first_name,
          user.last_name,
          user.imagePath,
          true,
          this.disscusion,
          conversation
        );
        this.friends.push(friend);
      });
      this.user.friends = this.friends;
    });
  }
}
