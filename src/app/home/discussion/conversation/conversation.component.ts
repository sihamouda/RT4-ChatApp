import { Component, Input } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { ListMessageComponent } from './list-message/list-message.component';
import { Message } from '../../../Model/Message';
import { FormsModule } from '@angular/forms';
import { Friend } from '../../../Model/friend';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [MessageComponent,ListMessageComponent,FormsModule],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent {
  inputvalue:string="";
  @Input() friend!:Friend;
  @Input() senderImage!:string;


  onEnterKeyPressed(){
    this.friend.discussion.unshift(
      new Message(true,this.inputvalue)
    );
    this.inputvalue=''
  }
}
