import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from './type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpclient: HttpClient) {}

  public login(userLogin: UserLogin): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/auth/login`;

    return this.httpclient.post<HttpResponse<any>>(url, userLogin, {
      observe: 'response',
      withCredentials: true,
    });
  }

  public saveUser(formData: FormData): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/auth/register`;

    return this.httpclient.post<HttpResponse<any>>(url, formData);
  }

  public logout(): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/auth/logout`;

    return this.httpclient.post<HttpResponse<any>>(url, {});
  }
}
