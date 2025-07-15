import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  submited = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSignIn(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      this.submited = false;
      return;
    }
    
    const formData = this.signInForm.value;
    console.log('Sign-in data:', formData);
    this.submited = true;
    
    this.authService.login(formData).subscribe({
      next: (res: any) => {
        console.log('Login successful:', res);
        this.authService.saveToken(res.token);
        const role = this.authService.getUserRole();
        console.log('User role after login:', role);
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed: ' + (error.error?.message || 'Invalid credentials'));
        this.submited = false;
      }
    });
    
  }
}
