import { Component, OnInit } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { ChatComponent } from './chat/chat.component';
import { DiscussionComponent } from './discussion/discussion.component';

import { Team } from '../Model/Team';
import { User } from '../Model/User';
import { Teams, users } from '../fakeData';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent,ChatComponent,DiscussionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public user!:User;
  public teams:Team[] = Teams
  
  constructor(
    private activatedRoute : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.user = users[params['id']]
      }
    )
  }

}
