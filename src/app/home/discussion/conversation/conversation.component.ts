import { Component, Input } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { ListMessageComponent } from './list-message/list-message.component';
import { Message } from '../../../Model/Message';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [MessageComponent,ListMessageComponent,FormsModule],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css'
})
export class ConversationComponent {
  inputvalue:string="";
  @Input() messages!:Message[];
  @Input() recieverName!:string;
  @Input() senderName!:string;


  onEnterKeyPressed(){
    this.messages.unshift(
      new Message(true,this.senderName,this.inputvalue)
    );
    this.inputvalue=''
  }
}
