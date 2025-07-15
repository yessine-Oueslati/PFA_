import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface LoginFormData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  formData: LoginFormData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login(this.formData).subscribe({
      next: (res: AuthResponse) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        alert('Login failed: ' + (err.error?.message || 'Invalid credentials'));
      }
    });
  }
}
  