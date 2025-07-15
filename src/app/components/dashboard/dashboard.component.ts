import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
} 