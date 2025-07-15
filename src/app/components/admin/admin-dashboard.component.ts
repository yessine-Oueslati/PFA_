import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  secteurId?: number;
  zoneId?: number;
  regionId?: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Secteur</th>
            <th>Zone</th>
            <th>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.secteurId || '-' }}</td>
            <td>{{ user.zoneId || '-' }}</td>
            <td>{{ user.regionId || '-' }}</td>
            <td>
              <button class="edit-btn" (click)="editUser(user)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Edit section will be added next -->
    </div>
  `,
  styles: [`
    .admin-dashboard-container {
      padding: 24px;
      max-width: 1000px;
      margin: 40px auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border-top: 8px solid #dc3545;
    }
    h1 {
      color: #dc3545;
      margin-bottom: 24px;
    }
    .user-table {
      width: 100%;
      border-collapse: collapse;
    }
    .user-table th, .user-table td {
      border: 1px solid #eee;
      padding: 8px 12px;
      text-align: center;
    }
    .user-table th {
      background: #dc3545;
      color: #fff;
    }
    .edit-btn {
      background: #dc3545;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 6px 14px;
      cursor: pointer;
    }
    .edit-btn:hover {
      background: #b71c1c;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<User[]>('http://localhost:8080/api/admin/users').subscribe(users => {
      this.users = users;
    });
  }

  editUser(user: User) {
    // To be implemented: open edit dialog/section
    alert('Edit user: ' + user.email);
  }
} 