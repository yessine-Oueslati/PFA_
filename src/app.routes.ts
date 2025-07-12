import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

/**
 * Application routes configuration
 * Defines the navigation structure for the application
 */
export const routes: Routes = [
  // Default route redirects to authentication
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  
  // Authentication route - handles sign in and sign up
  { path: 'auth', component: AuthComponent },
  
  // Dashboard route
  { path: 'dashboard', component: DashboardComponent },
  
  // Wildcard route for handling invalid URLs
  { path: '**', redirectTo: '/auth' }
];