// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserPayload } from '../models/userPayLoad.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userEmailSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('userEmail') || null
  );

  userEmail$ = this.userEmailSubject.asObservable();

  private userSubject = new BehaviorSubject<UserPayload | null>(
    this.decodeToken()
  );
  user$ = this.userSubject.asObservable();

  private profilePictureSubject = new BehaviorSubject<string | null>(null);
  profilePicture$ = this.profilePictureSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  private decodeToken(): UserPayload | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding token:', e);
      this.logout();
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return this.decodeToken()?.id || null;
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
    this.userSubject.next(this.decodeToken());
  }

  updateUserProfile(picture: string, username: string) {
    this.profilePictureSubject.next(picture);
    this.usernameSubject.next(username);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.userSubject.next(null);
  }
}
