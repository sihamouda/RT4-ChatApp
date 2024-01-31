import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { UserLogin } from '../../../service/type';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { fields } from './form.constant';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  showloader: boolean = false;
  fields = fields;

  constructor(
    private route: Router,
    private userService: UserService,
    private toast: ToastrService,
    private cookieService: CookieService
  ) {}

  onSubmit(Loginform: NgForm) {
    this.showloader = true;
    const userLogin: UserLogin = {
      username: Loginform.value['username'],
      password: Loginform.value['password'],
    };
    this.userService.login(userLogin).subscribe(
      (loginResponse: HttpResponse<any>) => {
        this.showloader = false;
        this.toast.success('User logged succcessfully');
        this.route.navigate(['home', Loginform.value['username']]);
      },
      (err: HttpErrorResponse) => {
        this.showloader = false;
        console.log(err.error.message);
        this.toast.error('Invalide data');
      }
    );
  }
}
