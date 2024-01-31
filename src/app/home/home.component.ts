import { Component, OnInit } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { ChatComponent } from './chat/chat.component';
import { DiscussionComponent } from './discussion/discussion.component';

import { Team } from '../Model/Team';
import { Person } from '../Model/User';
import { Teams, discussion, users } from '../fakeData';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/user.service';
import { User } from '../service/User';
import { Friend } from '../Model/friend';
import { Message } from '../Model/Message';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, ChatComponent, DiscussionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public user: Person = users[0];
  public teams: Team[] = Teams;
  public person!: User;
  public imageUrl!: string;
  public friends: Friend[] = [];
  public users!: User[];
  public disscusion: Message[] = discussion;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.paramMap.get('username');

    this.userService.getUsers().subscribe(
      (response: User[]) => {
        if (response.length > 0) {
          this.users = response;
          console.log('all users : ', this.users);

          this.users.map((user) => {
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

          this.person = this.users.find(
            (user) => user.username === username
          ) as User;

          this.users = this.users.filter((user) => user.username !== username);

          this.user.image = this.person.imagePath;
          this.user.first_name = this.person.first_name;
          this.user.last_name = this.person.last_name;

          this.userService.getConversation().subscribe((response) => {
            console.log(response);
            this.users.map((user) => {
              const conversation = response.filter(
                (conversation) =>
                  conversation.members.includes(user.id) &&
                  conversation.members.includes(this.person.id)
              );
              console.log(conversation);
              const friend = new Friend(
                user.first_name,
                user.last_name,
                user.imagePath,
                true,
                discussion
              );
              this.friends.push(friend);
            });
          });

          this.user.friends = this.friends;
        } else {
          console.error('No user data found in the response.');
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
