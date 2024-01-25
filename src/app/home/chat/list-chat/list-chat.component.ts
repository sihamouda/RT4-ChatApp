import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { Personne } from '../../../Model/personne';
import { PersonneService } from '../../personne-service.service';

@Component({
  selector: 'app-list-chat',
  standalone: true,
  imports: [CommonModule,ItemComponent],
  templateUrl: './list-chat.component.html',
  styleUrl: './list-chat.component.css'
})
export class ListChatComponent {
  @Input() personnes!:Personne[]

  constructor(
    private personneService: PersonneService
  ){}

  selectPersonne(personne:Personne){
    this.personneService.showPersonneDiscussion(personne)
  }
}
