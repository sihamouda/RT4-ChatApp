import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
  
  constructor(
    private route:Router
  ){}
    onSubmit(form: NgForm) {
      console.log('Your form data : ', form.value);
      this.route.navigate(['home']);
  }

}
