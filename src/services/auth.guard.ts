import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot
  ): boolean | UrlTree {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/auth']);
      return false;
    }
    if (route && route.data && route.data['roles']) {
      const allowedRoles = route.data['roles'] as string[];
      const userRole = this.authService.getUserRole();
      if (!userRole || !allowedRoles.includes(userRole)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }
    return true;
  }
} 