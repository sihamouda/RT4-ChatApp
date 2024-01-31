import { Component, Input, OnInit } from '@angular/core';
import { ConversationComponent } from './conversation/conversation.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { Message } from '../../Model/Message';
import { PersonneService } from '../personne.service';
import { CommonModule } from '@angular/common';
import { Friend } from '../../Model/friend';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [ConversationComponent, RightsidebarComponent, CommonModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css',
})
export class DiscussionComponent implements OnInit {
  @Input() senderImage: string = 'dey.png';
  friend: Friend = new Friend('', '', '', true, []);

  constructor(private personneService: PersonneService) {}

  ngOnInit(): void {
    this.personneService.personneDetailSubject.subscribe((personne) => {
      this.friend.first_name = personne.first_name;
      this.friend.last_name = personne.last_name;
      this.friend.image = personne.image;
      this.friend.discussion = personne.discussion;
    });
  }
}
