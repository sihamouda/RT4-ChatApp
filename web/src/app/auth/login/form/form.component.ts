import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserLogin } from '../../../service/type';
import { ToastrService } from 'ngx-toastr';
import { fields } from './form.constant';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  public showloader: boolean = false;
  public fields = fields;

  constructor(
    private route: Router,
    private toast: ToastrService,
    private authService: AuthService
  ) {}

  onSubmit(Loginform: NgForm) {
    this.showloader = true;
    const userLogin: UserLogin = {
      username: Loginform.value['username'],
      password: Loginform.value['password'],
    };
    this.authService.login(userLogin).subscribe(
      (loginResponse: HttpResponse<any>) => {
        this.showloader = false;
        this.toast.success('User logged succcessfully');
        this.route.navigate(['home', userLogin['username']]);
      },
      (err: HttpErrorResponse) => {
        this.showloader = false;
        console.log(err.error.message);
        this.toast.error('Invalide data');
      }
    );
  }
}
