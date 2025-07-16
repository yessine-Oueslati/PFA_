import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isAdmin(); else userPage">
      <h2>Admin Dashboard</h2>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #userPage>
      <div class="dashboard-container">
        <div class="dashboard-card">
          <h2>Welcome, User!</h2>
          <p class="dashboard-message">You are now logged in. Here you can manage your profile, view your activity, and more.</p>
          <button class="logout-btn" (click)="logout()">Logout</button>
        </div>
      </div>
    </ng-template>
  `,
  styleUrls: ['././dashboard.component.css']
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