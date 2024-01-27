import { Component, Input } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Message } from '../../../../Model/Message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-message',
  standalone: true,
  imports: [MessageComponent,CommonModule],
  templateUrl: './list-message.component.html',
  styleUrl: './list-message.component.css'
})
export class ListMessageComponent {
  @Input() messages!:Message[];
  @Input() recieverImage!:string;
  @Input() senderImage!:string
  
}
