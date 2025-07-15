import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { AdminDashboardComponent } from './app/components/admin/admin-dashboard.component';

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

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  
  // Wildcard route for handling invalid URLs
  { path: '**', redirectTo: '/auth' }
];