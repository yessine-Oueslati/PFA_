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
    <div class="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border-t-8 border-red-600">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-red-600">Admin Dashboard</h1>
        <button class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow transition" (click)="addUser()">
          <svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4v16m8-8H4'/></svg>
          Add User
        </button>
      </div>
      <div class="relative mb-4">
        <input
          type="text"
          class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-base"
          placeholder="Search by name..."
          [(ngModel)]="searchTerm"
          (input)="filterUsers()"
        />
        <span class="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z'/></svg>
        </span>
      </div>
      <div class="overflow-x-auto rounded-lg shadow">
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="px-4 py-3 bg-red-600 text-white font-semibold">ID</th>
              <th class="px-4 py-3 bg-red-600 text-white font-semibold">First Name</th>
              <th class="px-4 py-3 bg-red-600 text-white font-semibold">Last Name</th>
              <th class="px-4 py-3 bg-red-600 text-white font-semibold">Email</th>
              <th class="px-4 py-3 bg-red-600 text-white font-semibold">Role</th>
              <th class="px-4 py-3 bg-red-600 text-white font-semibold">Secteur</th>
              <th class="px-4 py-3 bg-red-600 text-white font-semibold">Zone</th>
              <th class="px-4 py-3 bg-red-600 text-white font-semibold">Region</th>
              <th class="px-4 py-3 bg-red-600 text-white font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of filteredUsers" class="hover:bg-red-50 transition">
              <td class="px-4 py-2 text-center">{{ user.id }}</td>
              <td class="px-4 py-2">{{ user.firstName }}</td>
              <td class="px-4 py-2">{{ user.lastName }}</td>
              <td class="px-4 py-2">{{ user.email }}</td>
              <td class="px-4 py-2">
                <span [ngClass]="{
                  'bg-red-100 text-red-700': user.role === 'ADMIN',
                  'bg-blue-100 text-blue-700': user.role === 'CHEF_REGION',
                  'bg-green-100 text-green-700': user.role === 'CHEF_SECTEUR',
                  'bg-yellow-100 text-yellow-700': user.role === 'CHEF_ZONE',
                  'bg-gray-100 text-gray-700': user.role !== 'ADMIN' && user.role !== 'CHEF_REGION' && user.role !== 'CHEF_SECTEUR' && user.role !== 'CHEF_ZONE'
                }" class="inline-block px-3 py-1 rounded-full text-xs font-semibold">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-4 py-2 text-center">{{ user.secteurId || '-' }}</td>
              <td class="px-4 py-2 text-center">{{ user.zoneId || '-' }}</td>
              <td class="px-4 py-2 text-center">{{ user.regionId || '-' }}</td>
              <td class="px-4 py-2 flex items-center justify-center gap-2">
                <button class="p-2 rounded hover:bg-red-100 transition" (click)="editUser(user)" title="Edit">
                  <svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 1 0-4-4l-8 8v3z'/></svg>
                </button>
                <button class="p-2 rounded hover:bg-red-100 transition" (click)="deleteUser(user)" title="Delete">
                  <svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-red-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'/></svg>
                </button>
                <button class="p-2 rounded hover:bg-blue-100 transition" (click)="assignEntity(user)" title="Assign Entity">
                  <svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4v16m8-8H4'/></svg>
                </button>
              </td>
            </tr>
            <tr *ngIf="filteredUsers.length === 0">
              <td colspan="9" class="text-center py-6 text-gray-400">No users found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
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

  addUser() {
    alert('Add user (feature coming soon)');
  }
} 