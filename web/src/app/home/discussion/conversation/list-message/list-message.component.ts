import { Component, Input, OnInit } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { DisplayMessage } from '../../../../Model/DisplayMessage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-message',
  standalone: true,
  imports: [MessageComponent, CommonModule],
  templateUrl: './list-message.component.html',
  styleUrl: './list-message.component.css',
})
export class ListMessageComponent implements OnInit {
  @Input() messages!: DisplayMessage[];
  @Input() recieverImage!: string;
  @Input() senderImage!: string;

  ngOnInit(): void {}
}
