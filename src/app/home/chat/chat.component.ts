import { Component, Input, OnInit } from '@angular/core';
import { TeamsComponent } from './teams/teams.component';
import { ListChatComponent } from './list-chat/list-chat.component';
import { ChatsComponent } from './chats/chats.component';
import { UserComponent } from './user/user.component';
import { Team } from '../../Model/Team';
import { User } from '../../Model/User';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [TeamsComponent, ListChatComponent, ChatsComponent, UserComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  @Input() user!: User;
  @Input() teams!: Team[];

  constructor(private authService: AuthService, private route: Router) {}
  ngOnInit(): void {
    console.log('USERS : ', this.user);
  }

  onClick() {
    this.authService.logout().subscribe((response: HttpResponse<any>) => {
      console.log(response);
      this.route.navigate(['']);
    });
  }
}
