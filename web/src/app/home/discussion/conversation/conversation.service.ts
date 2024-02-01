import { Injectable } from '@angular/core';
import { Friend } from '../../../Model/friend';
import { DisplayMessage } from '../../../Model/DisplayMessage';
import { SocketService } from '../../../webSocket/socket.service';
import { Message } from '../../../Model/Message';
import { User } from '../../../Model/User';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private socketService: SocketService) {}

  public formatCustomDateTime(input: Date): string {
    const date = new Date(input);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month} ${hours}:${minutes}`;
  }

  public loadMessages(friend: Friend) {
    friend.conversation.messages.forEach((message) => {
      const formattedDate = this.formatCustomDateTime(message.createdAt);
      const isSender = message.sender === friend.id ? false : true;
      friend.discussion.unshift(
        new DisplayMessage(isSender, message.message, formattedDate)
      );
    });
  }

  public leaveRoom() {
    this.socketService.leaveRoom();
  }

  public joinRoom(friend: Friend) {
    const room_id = friend.conversation.id;
    console.log(room_id);
    this.socketService.joinRoom(room_id);
  }

  public setupMessageSubscription(friend: Friend) {
    this.socketService.receiveMessage().subscribe((message) => {
      console.log(message.createdAt);
      const formattedDate = this.formatCustomDateTime(message.createdAt);
      console.log(formattedDate);
      if (message.sender === friend.id) {
        friend.discussion.unshift(
          new DisplayMessage(false, message.message, formattedDate)
        );
      }
    });
  }

  public createMessage(contenu: string, user: User, friend: Friend): Message {
    const time = new Date();
    return new Message(
      contenu,
      user.id,
      friend.conversation.id,
      time,
      'text',
      'sent'
    );
  }

  public sendMessage(message: Message) {
    this.socketService.sendMessage(message);
  }

  public updateDiscussion(friend: Friend, message: Message) {
    const formattedDate = this.formatCustomDateTime(message.createdAt);

    friend.discussion.unshift(
      new DisplayMessage(true, message.message, formattedDate)
    );
  }
}
