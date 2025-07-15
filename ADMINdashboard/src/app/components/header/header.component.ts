import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-primary-600">
                  {{ getCurrentUser()?.firstName?.charAt(0) }}{{ getCurrentUser()?.lastName?.charAt(0) }}
                </span>
              </div>
              <div class="text-sm">
                <p class="text-gray-900 font-medium">{{ getCurrentUser()?.firstName }} {{ getCurrentUser()?.lastName }}</p>
                <p class="text-gray-500">{{ getCurrentUser()?.email }}</p>
              </div>
            </div>
            
            <button 
              (click)="logout()" 
              class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }
}