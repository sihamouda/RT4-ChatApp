import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { fields } from './regform.constant';
import { UserService } from '../../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserLogin } from '../../service/type';

@Component({
  selector: 'app-regform',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './regform.component.html',
  styleUrl: './regform.component.css',
})
export class RegformComponent {
  showloader: boolean = false;
  passwordsMatching: boolean = false;
  fields = fields;
  avatar!: File;

  constructor(
    private userService: UserService,
    private toast: ToastrService,
    private route: Router
  ) {}

  checkPasswords(form: NgForm) {
    if (form.value['password'] === form.value['confirm_password']) {
      this.passwordsMatching = true;
    } else {
      this.passwordsMatching = false;
    }
  }

  getFiles(event: any) {
    this.avatar = event.target.files[0];
  }

  onSubmit(RegForm: NgForm) {
    this.showloader = true;
    console.log(this.avatar);
    const username = RegForm.form.value['username'];

    const formDataa = new FormData();
    formDataa.append('username', username);
    formDataa.append('first_name', RegForm.form.value['first_name']);
    formDataa.append('last_name', RegForm.form.value['last_name']);
    formDataa.append('email', RegForm.form.value['email']);
    formDataa.append('password', RegForm.form.value['password']);
    formDataa.append('avatar', this.avatar);

    this.userService.saveUser(formDataa).subscribe(
      (response) => {
        this.showloader = false;
        console.log(response);
        this.toast.success('User registred succcessfully');
        const userLogin: UserLogin = {
          username: RegForm.value['username'],
          password: RegForm.value['password'],
        };
        this.userService.login(userLogin).subscribe(() => {
          this.route.navigate(['home', userLogin['username']]);
        });
      },
      (error) => {
        this.showloader = false;
        this.toast.error('Failed to make registration');
      }
    );
  }
}
