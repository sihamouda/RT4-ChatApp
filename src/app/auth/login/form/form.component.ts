import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  fields = [
    { type: "text", name: "EMAIL", description: "Email Invalide"},
    { type: "password", name: "PASSWORD", description: "The password must have at least 4 characters"  },]

    onSubmit(form: NgForm) {
      console.log('Your form data : ', form.value);
  }

}
