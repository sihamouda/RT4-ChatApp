import { Component, Input } from '@angular/core';
import { TeamsComponent } from './teams/teams.component';
import { ListChatComponent } from './list-chat/list-chat.component';
import { ChatsComponent } from './chats/chats.component';
import { UserComponent } from './user/user.component';
import { Team } from '../../Model/Team';
import { Person } from '../../Model/User';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [TeamsComponent, ListChatComponent, ChatsComponent, UserComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  @Input() user!: Person;
  @Input() teams!: Team[];
}
