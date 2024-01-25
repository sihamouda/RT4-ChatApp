import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { ChatComponent } from './chat/chat.component';
import { DiscussionComponent } from './discussion/discussion.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent,ChatComponent,DiscussionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
