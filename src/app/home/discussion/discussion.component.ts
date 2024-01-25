import { Component, OnInit } from '@angular/core';
import { ConversationComponent } from './conversation/conversation.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { Message } from '../../Model/Message';
import { PersonneService } from '../personne-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [ConversationComponent,RightsidebarComponent,CommonModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent implements OnInit {
  recieverName!:string;
  recieverSourceImg!:string;
  messages!:Message[];
  senderName:string="dey.png";

  constructor(
    private personneService: PersonneService
  ){}

  ngOnInit(): void {
    this.personneService.personneDetailSubject.subscribe((personne)=>{
      this.recieverName = personne.name;
      this.recieverSourceImg = personne.image;
      this.messages=[
        new Message(true,"dey.png","Your message goes here ...."),
        new Message(true,"dey.png","Your message goes here ...."),
        new Message(false,this.recieverSourceImg,"Your message goes here ...."),
        new Message(true,"dey.png","Your message goes here ...."),
        new Message(true,"dey.png","Your message goes here ...."),
        new Message(false,this.recieverSourceImg,"Your message goes here ...."),
        new Message(true,"dey.png","Your message goes here ...."),
        new Message(false,this.recieverSourceImg,"Your message goes here ...."),
      ]
    });
    
  }

  


}
