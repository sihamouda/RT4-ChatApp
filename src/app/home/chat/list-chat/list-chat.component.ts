import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { PersonneService } from '../../personne.service';
import { Friend } from '../../../Model/friend';

@Component({
  selector: 'app-list-chat',
  standalone: true,
  imports: [CommonModule,ItemComponent],
  templateUrl: './list-chat.component.html',
  styleUrl: './list-chat.component.css'
})
export class ListChatComponent {
  @Input() personnes!:Friend[]

  constructor(
    private personneService: PersonneService
  ){}

  selectPersonne(friend:Friend){
    this.personneService.showPersonneDiscussion(friend)
  }
}
