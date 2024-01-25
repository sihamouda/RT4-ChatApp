import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Personne } from '../Model/personne';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  personneDetailSubject = new Subject<Personne>();
  constructor() { }


  showPersonneDiscussion(personne: Personne) {
    this.personneDetailSubject.next(personne);
  }
}
