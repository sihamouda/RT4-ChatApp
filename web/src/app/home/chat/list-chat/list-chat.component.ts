import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { PersonneService } from '../../personne.service';
import { Friend } from '../../../Model/friend';
import { ConversationService } from '../../discussion/conversation/conversation.service';

@Component({
  selector: 'app-list-chat',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './list-chat.component.html',
  styleUrl: './list-chat.component.css',
})
export class ListChatComponent implements OnInit {
  @Input() friends!: Friend[];

  constructor(
    private personneService: PersonneService,
    private conversationServie: ConversationService
  ) {
    console.log('friends : ', this.friends);
  }

  ngOnInit(): void {}

  selectPersonne(friend: Friend) {
    this.personneService.showPersonneDiscussion(friend);
    this.conversationServie.leaveRoom();
    this.conversationServie.joinRoom(friend);
  }

  getFirstMessage(friend: Friend): string {
    if (friend.discussion.length === 0) {
      return 'Start your conversation now';
    } else {
      return friend.discussion[0].contenu;
    }
  }
}
