import { Component, Input, OnInit } from '@angular/core';
import { EclipseComponent } from '../../../chat/eclipse/eclipse.component';
import { CommonModule } from '@angular/common';
import { Message } from '../../../../Model/Message';
import { DisplayMessage } from '../../../../Model/DisplayMessage';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [EclipseComponent, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent implements OnInit {
  dimension = '40px';
  @Input() image!: string;
  @Input() isSender!: boolean;
  @Input() contenu!: string;
  @Input() message!: DisplayMessage;

  ngOnInit(): void {}
}
