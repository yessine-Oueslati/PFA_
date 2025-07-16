import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  departement: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-dashboard-container">
      <h1>User Management</h1>
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Title</th>
            <th>Departement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of filteredUsers">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.jobTitle }}</td>
            <td>{{ user.departement }}</td>
            <td>
              <button class="edit-btn" (click)="editUser(user)">Edit</button>
              <button class="delete-btn" (click)="deleteUser(user)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Edit Modal (optional, can be left as is or updated) -->
      <div *ngIf="isEditModalOpen" class="modal-backdrop">
        <div class="modal">
          <h2>Edit Employee</h2>
          <div>
            <label>Name:</label>
            <input [(ngModel)]="editName" placeholder="Name" />
          </div>
          <div>
            <label>Email:</label>
            <input [(ngModel)]="editEmail" placeholder="Email" />
          </div>
          <div>
            <label>Phone:</label>
            <input [(ngModel)]="editPhone" placeholder="Phone" />
          </div>
          <div>
            <label>Job Title:</label>
            <input [(ngModel)]="editJobTitle" placeholder="Job Title" />
          </div>
          <div>
            <label>Departement:</label>
            <input [(ngModel)]="editDepartement" placeholder="Departement" />
          </div>
          <div class="modal-actions">
            <button (click)="saveUser()">Save</button>
            <button (click)="closeEditModal()">Cancel</button>
          </div>
        </div>
      </div>
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
    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; z-index: 1000; }
     .modal { background: #fff; padding: 24px; border-radius: 8px; min-width: 320px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
     .modal-actions { margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end; }
  `]
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  // Modal state
  isEditModalOpen = false;
  editingUser: User | null = null;
  editName: string = '';
  editEmail: string = '';
  editPhone: string = '';
  editJobTitle: string = '';
  editDepartement: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<User[]>('/api/employees/all').subscribe(users => {
      this.users = users;
      this.filterUsers();
    });
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.jobTitle.toLowerCase().includes(term) ||
      user.departement.toLowerCase().includes(term)
    );
  }

  editUser(user: User) {
    this.editingUser = { ...user };
    this.editName = user.name;
    this.editEmail = user.email;
    this.editPhone = user.phone;
    this.editJobTitle = user.jobTitle;
    this.editDepartement = user.departement;
    this.isEditModalOpen = true;
  }

  saveUser() {
    // Implement update logic if needed
    this.isEditModalOpen = false;
    this.editingUser = null;
    this.fetchUsers();
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.editingUser = null;
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete employee ${user.email}?`)) {
      this.http.delete(`/api/employees/delete/${user.id}`).subscribe(() => {
        this.fetchUsers();
      });
    }
  }
} 