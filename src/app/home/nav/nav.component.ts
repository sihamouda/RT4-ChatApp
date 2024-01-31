import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(private route: Router, private userService: UserService) {}

  onClick() {
    this.userService.logout().subscribe((response: HttpResponse<any>) => {
      console.log(response);
      this.route.navigate(['']);
    });
  }
}
