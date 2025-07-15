import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let user of users" class="hover:bg-gray-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ user.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-600">
                      {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [ngClass]="getRoleBadgeClass(user.role)" class="badge">
                  {{ getRoleDisplayName(user.role) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span *ngIf="user.secteur" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ user.secteur }}
                </span>
                <span *ngIf="user.zone" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ user.zone }}
                </span>
                <span *ngIf="user.region" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  {{ user.region }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button 
                    (click)="editUser.emit(user)"
                    class="text-primary-600 hover:text-primary-900 font-medium transition-colors duration-150"
                  >
                    Edit
                  </button>
                  <button 
                    (click)="deleteUser.emit(user.id)"
                    class="text-red-600 hover:text-red-900 font-medium transition-colors duration-150"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            
            <tr *ngIf="users.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                <div class="flex flex-col items-center">
                  <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <p class="text-lg font-medium">No users found</p>
                  <p class="text-sm">Try adjusting your search or add a new user</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<number>();

  getRoleDisplayName(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'Admin';
      case UserRole.CHEF_SECTEUR:
        return 'Chef Secteur';
      case UserRole.CHEF_ZONE:
        return 'Chef Zone';
      case UserRole.CHEF_REGION:
        return 'Chef Region';
      default:
        return role;
    }
  }

  getRoleBadgeClass(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'badge-admin';
      case UserRole.CHEF_SECTEUR:
        return 'badge-chef-secteur';
      case UserRole.CHEF_ZONE:
        return 'badge-chef-zone';
      case UserRole.CHEF_REGION:
        return 'badge-chef-region';
      default:
        return 'badge-admin';
    }
  }
}