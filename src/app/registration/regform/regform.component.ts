import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-regform',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './regform.component.html',
  styleUrl: './regform.component.css'
})
export class RegformComponent {
  passwordsMatching: boolean = false;


  fields = [
    { type: "text", name: "FIRSTNAME", description: "FIRSTNAME must contain more then 4 caracteres"},
    { type: "text", name: "LASTNAME", description: "LASTNAME must contain more then 4 caracteres" },
    { type: "text", name: "USERNAME", description: "USERNAME must contain more then 4 caracteres" },
    { type: "date", name: "BIRTHDATE", description: "You need to choose birthdate" },
    { type: "text", name: "EMAIL", description: "Email Invalide" },
    { type: "number", name: "NUMBER PHONE", description: "Phone number must be composed by 8 numbers" },
    { type: "password", name: "PASSWORD", description: "The password must have at least 4 characters" },
    { type: "password", name: "CONFIRM PASSWORD", description: "INVALIDE" }
  ];


  checkPasswords(form: NgForm) {
    if (form.value['PASSWORD'] === form.value['CONFIRM PASSWORD']) {
      this.passwordsMatching = true;
    } else {
      this.passwordsMatching = false;
    }
  }

onSubmit(RegForm:NgForm){
  console.log('Your form data : ', RegForm.value);
}

}


