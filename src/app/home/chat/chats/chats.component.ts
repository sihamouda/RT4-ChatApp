import { Component, Input, OnInit } from '@angular/core';
import { ListChatComponent } from '../list-chat/list-chat.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Friend } from '../../../Model/friend';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [ListChatComponent,CommonModule,FormsModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {
  
  searchTerm: string = '';
  @Input() personnes!:Friend[]

  filteredPersonne(){
    return this.personnes.filter(personne =>
      personne.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  }

