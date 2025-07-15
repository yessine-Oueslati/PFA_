import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  submited = false;

  constructor(
    private formBuilder: FormBuilder,
    
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      companyName: ['', Validators.required],
      phone: '',
    });
  }

  onSignUp(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.submited = false;
      return;
    }
    
    // Check if passwords match
    if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Prepare data for backend (all fields that backend expects)
    const formData = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      companyName: this.signUpForm.value.companyName,
      phone: this.signUpForm.value.phone,
    };
    
    // Log all form data for debugging
    console.log('All form data:', this.signUpForm.value);
    console.log('Data being sent to backend:', formData);
    
    this.submited = true;
    
    this.authService.register(formData).subscribe({
      next: (res: any) => {
        console.log('Registration successful:', res);
        this.authService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        let errorMsg = error.error?.message || error.error || error.message || 'Unknown error';
        alert('Registration failed: ' + errorMsg);
        this.submited = false;
      }
    });
  }
}
