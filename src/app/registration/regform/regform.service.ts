import { Injectable } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserLogin } from '../../service/type';

@Injectable({
  providedIn: 'root',
})
export class RegformService {
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private route: Router
  ) {}

  public createFormData(
    form: NgForm,
    username: string,
    avatar: File
  ): FormData {
    const formDataa = new FormData();
    formDataa.append('username', username);
    formDataa.append('first_name', form.form.value['first_name']);
    formDataa.append('last_name', form.form.value['last_name']);
    formDataa.append('email', form.form.value['email']);
    formDataa.append('password', form.form.value['password']);
    formDataa.append('avatar', avatar);
    return formDataa;
  }

  public handleRegistrationSuccess(
    response: any,
    RegForm: NgForm,
    showloader: Boolean
  ) {
    showloader = false;
    console.log(response);
    this.toast.success('User registered successfully');

    const userLogin: UserLogin = {
      username: RegForm.value['username'],
      password: RegForm.value['password'],
    };

    this.authService.login(userLogin).subscribe(() => {
      this.route.navigate(['home', userLogin['username']]);
    });
  }

  public handleRegistrationError(showloader: Boolean) {
    showloader = false;
    this.toast.error('Failed to make registration');
  }
}
