import { Component } from '@angular/core';
import { RegformComponent } from './regform/regform.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RegformComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

}
