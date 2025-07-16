import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div *ngIf="isAdmin(); else userPage">
      <h2>Admin Dashboard</h2>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #userPage>
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 80vh;">
        <h2>Welcome, User!</h2>
        <button (click)="logout()" style="margin-top: 24px; padding: 10px 24px; font-size: 1.1rem;">Logout</button>
      </div>
    </ng-template>
  `
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'ADMIN';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
} 