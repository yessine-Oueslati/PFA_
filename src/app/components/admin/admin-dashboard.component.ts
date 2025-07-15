import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        class="search-bar"
        placeholder="Search by name..."
        [(ngModel)]="searchTerm"
        (input)="filterUsers()"
      />
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
          <tr *ngFor="let user of filteredUsers">
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
              <button class="delete-btn" (click)="deleteUser(user)">Delete</button>
              <button class="assign-btn" (click)="assignEntity(user)">Assign Entity</button>
            </td>
          </tr>
        </tbody>
      </table>
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
    .search-bar {
      width: 100%;
      padding: 10px 14px;
      margin-bottom: 18px;
      border: 1px solid #eee;
      border-radius: 6px;
      font-size: 1rem;
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
    .edit-btn, .delete-btn, .assign-btn {
      background: #dc3545;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 6px 10px;
      cursor: pointer;
      margin: 0 2px;
      font-size: 0.95rem;
    }
    .edit-btn:hover, .delete-btn:hover, .assign-btn:hover {
      background: #b71c1c;
    }
    .delete-btn {
      background: #757575;
    }
    .delete-btn:hover {
      background: #333;
    }
    .assign-btn {
      background: #1976d2;
    }
    .assign-btn:hover {
      background: #0d47a1;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<User[]>('http://localhost:8080/api/admin/users').subscribe(users => {
      this.users = users;
      this.filterUsers();
    });
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term)
    );
  }

  editUser(user: User) {
    alert('Edit user: ' + user.email);
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete user ${user.email}?`)) {
      this.http.delete(`http://localhost:8080/api/admin/users/${user.id}`).subscribe(() => {
        this.fetchUsers();
      });
    }
  }

  assignEntity(user: User) {
    alert('Assign entity to user: ' + user.email + ' (feature coming soon)');
  }
} 