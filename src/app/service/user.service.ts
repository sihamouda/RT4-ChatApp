import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Conversation, UserLogin, UserRegistration } from './type';
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  public getUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/user`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { headers, withCredentials: true };

    return this.httpclient.get<User[]>(url, options);
  }

  public getImage(url: string): Observable<Blob> {
    // Set responseType to 'blob' to indicate binary data
    return this.httpclient.get(url, { responseType: 'blob' });
  }

  public getConversation(): Observable<Conversation[]> {
    const url = `${this.baseUrl}/conversation`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { headers, withCredentials: true };

    return this.httpclient.get<Conversation[]>(url, options);
  }
}
