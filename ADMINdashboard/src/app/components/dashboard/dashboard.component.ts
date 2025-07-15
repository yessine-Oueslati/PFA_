import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { UserTableComponent } from '../user-table/user-table.component';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    UserTableComponent,
    AddUserModalComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>
      
      <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="card p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Users</p>
                <p class="text-2xl font-bold text-gray-900">{{ allUsers.length }}</p>
              </div>
            </div>
          </div>
          
          <div class="card p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Admins</p>
                <p class="text-2xl font-bold text-gray-900">{{ getAdminCount() }}</p>
              </div>
            </div>
          </div>
          
          <div class="card p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Managers</p>
                <p class="text-2xl font-bold text-gray-900">{{ getManagerCount() }}</p>
              </div>
            </div>
          </div>
          
          <div class="card p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Active Now</p>
                <p class="text-2xl font-bold text-gray-900">{{ getActiveCount() }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Search and Actions -->
        <div class="card p-6 mb-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div class="flex-1 max-w-lg">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  [(ngModel)]="searchTerm"
                  (input)="filterUsers()"
                  placeholder="Search users by name or email..."
                  class="input-field pl-10"
                />
              </div>
            </div>
            <div class="flex space-x-3">
              <button 
                (click)="openAddUserModal()"
                class="btn-primary flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Add User</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <app-user-table 
          [users]="filteredUsers"
          (editUser)="editUser($event)"
          (deleteUser)="deleteUser($event)"
        ></app-user-table>
      </main>
    </div>

    <!-- Add/Edit User Modal -->
    <app-add-user-modal 
      [isOpen]="isModalOpen"
      [editingUser]="editingUser"
      (closeModalEvent)="closeModal()"
      (userCreated)="onUserCreated($event)"
      (userUpdated)="onUserUpdated($event)"
    ></app-add-user-modal>
  `
})
export class DashboardComponent implements OnInit {
  allUsers: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  isModalOpen = false;
  editingUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
      this.filteredUsers = users;
    });
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.allUsers.filter(user =>
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  openAddUserModal() {
    this.editingUser = null;
    this.isModalOpen = true;
  }

  editUser(user: User) {
    this.editingUser = user;
    this.isModalOpen = true;
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingUser = null;
  }

  onUserCreated(user: User) {
    this.loadUsers();
  }

  onUserUpdated(user: User) {
    this.loadUsers();
  }

  getAdminCount(): number {
    return this.allUsers.filter(user => user.role === 'ADMIN').length;
  }

  getManagerCount(): number {
    return this.allUsers.filter(user => 
      user.role === 'CHEF_SECTEUR' || 
      user.role === 'CHEF_ZONE' || 
      user.role === 'CHEF_REGION'
    ).length;
  }

  getActiveCount(): number {
    // Mock active count - in real app, this would come from backend
    return Math.floor(this.allUsers.length * 0.75);
  }
}