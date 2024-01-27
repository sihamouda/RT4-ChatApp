import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Friend } from '../Model/friend';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  personneDetailSubject = new Subject<Friend>();
  constructor() { }


  showPersonneDiscussion(friend: Friend) {
    this.personneDetailSubject.next(friend);
  }
}
