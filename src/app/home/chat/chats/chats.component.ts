import { Component, Input, OnInit } from '@angular/core';
import { ListChatComponent } from '../list-chat/list-chat.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Friend } from '../../../Model/friend';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [ListChatComponent, CommonModule, FormsModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css',
})
export class ChatsComponent implements OnInit {
  searchTerm: string = '';
  @Input() friends!: Friend[];

  constructor() {}
  ngOnInit(): void {
    console.log('friendss : ', this.friends);
  }

  filteredPersonne() {
    return this.friends.filter((personne) =>
      personne.first_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
