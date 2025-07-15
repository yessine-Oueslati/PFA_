import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRole } from '../models/user.model';

interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Simulate logged-in admin user
    const mockUser: AuthUser = {
      id: 1,
      email: 'admin@example.com',
      role: UserRole.ADMIN,
      firstName: 'Admin',
      lastName: 'User'
    };
    this.currentUserSubject.next(mockUser);
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === UserRole.ADMIN;
  }

  getToken(): string {
    // Mock JWT token
    return 'mock-jwt-token-123456789';
  }

  login(email: string, password: string): Observable<boolean> {
    // Mock login - always successful for admin
    return new Observable(observer => {
      setTimeout(() => {
        const mockUser: AuthUser = {
          id: 1,
          email: email,
          role: UserRole.ADMIN,
          firstName: 'Admin',
          lastName: 'User'
        };
        this.currentUserSubject.next(mockUser);
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }
}