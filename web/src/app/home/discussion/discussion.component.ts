import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConversationComponent } from './conversation/conversation.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { PersonneService } from '../personne.service';
import { CommonModule } from '@angular/common';
import { Friend } from '../../Model/friend';
import { User } from '../../Model/User';
import { Conversation } from '../../Model/Conversation';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [ConversationComponent, RightsidebarComponent, CommonModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css',
})
export class DiscussionComponent implements OnInit {
  @Input() user!: User;
  conversation!: Conversation;
  friend!: Friend;

  constructor(private personneService: PersonneService) {
    this.personneService.personneDetailSubject.subscribe((personne) => {
      this.friend = personne;
      console.log('getFriend : ', this.friend);
    });
  }

  ngOnInit(): void {}
}
