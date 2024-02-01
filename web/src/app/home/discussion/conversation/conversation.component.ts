import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { ListMessageComponent } from './list-message/list-message.component';
import { FormsModule } from '@angular/forms';
import { Friend } from '../../../Model/friend';
import { User } from '../../../Model/User';
import { ConversationService } from './conversation.service';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [MessageComponent, ListMessageComponent, FormsModule],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
})
export class ConversationComponent implements OnInit {
  inputvalue: string = '';
  @Input() friend!: Friend;
  @Input() user!: User;

  constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
    this.conversationService.loadMessages(this.friend);
    // this.conversationService.joinRoom(this.friend);
    this.conversationService.setupMessageSubscription(this.friend);
  }

  onEnterKeyPressed() {
    const message = this.conversationService.createMessage(
      this.inputvalue,
      this.user,
      this.friend
    );
    this.conversationService.sendMessage(message);
    this.conversationService.updateDiscussion(this.friend, message);
    this.inputvalue = '';
  }
}
