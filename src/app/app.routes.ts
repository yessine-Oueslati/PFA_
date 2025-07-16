import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes = [
  { path: 'dashboard', component: DashboardComponent }, // both admin and user use DashboardComponent
  { path: 'admin', component: DashboardComponent },    // admin route remains unchanged
  // ...other routes...
]; 