import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { fields } from './regform.constant';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserLogin } from '../../service/type';
import { AuthService } from '../../service/auth.service';
import { RegformService } from './regform.service';

@Component({
  selector: 'app-regform',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './regform.component.html',
  styleUrl: './regform.component.css',
})
export class RegformComponent {
  public showloader: boolean = false;
  public passwordsMatching: boolean = false;
  public fields = fields;
  public avatar!: File;

  constructor(
    private authService: AuthService,
    private regForm: RegformService
  ) {}

  checkPasswords(form: NgForm) {
    this.passwordsMatching =
      form.value['password'] === form.value['confirm_password'];
  }

  getFiles(event: any) {
    this.avatar = event.target.files[0];
  }

  onSubmit(RegForm: NgForm) {
    this.showloader = true;
    const username = RegForm.form.value['username'];
    const formDataa = this.regForm.createFormData(
      RegForm,
      username,
      this.avatar
    );

    this.authService.saveUser(formDataa).subscribe(
      (response) => {
        this.regForm.handleRegistrationSuccess(
          response,
          RegForm,
          this.showloader
        );
      },
      (error) => {
        this.regForm.handleRegistrationError(this.showloader);
      }
    );
  }
}
