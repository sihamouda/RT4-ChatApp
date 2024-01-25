import { Component } from '@angular/core';
import { TeamsComponent } from './teams/teams.component';
import { ListChatComponent } from './list-chat/list-chat.component';
import { ChatsComponent } from './chats/chats.component';
import { UserComponent } from './user/user.component';
import { Team } from '../../Model/Team';
import { Personne } from '../../Model/personne';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [TeamsComponent,ListChatComponent,ChatsComponent,UserComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  public sourceImg = "dey.png";
  public user="Adam Dey";
  public teams:Team[] = [
    new Team ("#8A91D7","G","Rjiba"),
    new Team ("#C76DD6","S","Rjiba"),
    new Team ("#78D0B0","D","Rjiba"),
    new Team ("#E1D094","F","Rjiba"),
    new Team ("#E8A179","R","Rjiba"),
  ]

  personnes: Personne[] = [
    new Personne("Ahmed Rjiba", "Ahla, cv? mechia la vie?", "rjiba.png", "20:30 PM",true),
    new Personne("Khaldoun TAKTAK", "Ahla, cv? mechia la vie?", "khaldoun.png", "20:30 PM",false),
    new Personne("Anis Hammouda", "Ahla, cv? mechia la vie?", "anis.png", "20:30 PM",true),
    new Personne("Oussema Chaouachi", "Ahla, cv? mechia la vie?", "chaouachi.png", "20:30 PM",true),
    new Personne("Anis Hammouda", "Ahla, cv? mechia la vie?", "anis.png", "20:30 PM",true),
  ];

}
