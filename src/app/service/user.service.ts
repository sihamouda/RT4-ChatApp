import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserLogin, UserRegistration } from './type';
import { User } from '../Model/User';
import { Conversation } from '../Model/Conversation';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpclient: HttpClient) {}

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
