import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  fields = [
    { type: 'text', name: 'EMAIL', description: 'Email Invalide' },
    {
      type: 'password',
      name: 'PASSWORD',
      description: 'The password must have at least 4 characters',
    },
  ];

  constructor(private route: Router) {}
  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value.PASSWORD);
    if((form.value.EMAIL==="ahmed@Insat.tn")&&(form.value.PASSWORD==="0000")){
      const link = ['home',0];
      this.route.navigate(link);
    }else{
      const link = ['home',1];
      this.route.navigate(link);
    }
  }
}
