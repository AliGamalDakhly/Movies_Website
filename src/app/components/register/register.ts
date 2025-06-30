import { Component } from '@angular/core';
import {RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Adjust path as needed

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule, CommonModule],

  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;
    isLoading = false;
    errorMessage = '';
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.registerForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: this.passwordMatchValidator });
    }
  
    // Custom validator to check if passwords match
    passwordMatchValidator(form: FormGroup) {
      const password = form.get('password');
      const confirmPassword = form.get('confirmPassword');
      
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
      
      return null;
    }
  
    // Getter methods for easy access to form controls
    get firstName() {
      return this.registerForm.get('firstName');
    }
  
    get lastName() {
      return this.registerForm.get('lastName');
    }
  
    get email() {
      return this.registerForm.get('email');
    }
  
    get password() {
      return this.registerForm.get('password');
    }
  
    get confirmPassword() {
      return this.registerForm.get('confirmPassword');
    }
  
    onSubmit() {
      if (this.registerForm.valid) {
        this.isLoading = true;
        this.errorMessage = '';
  
        const { firstName, lastName, email, password } = this.registerForm.value;
  
        this.authService.register(email, password, firstName, lastName).subscribe({
          next: (userCredential) => {
            console.log('Registration successful:', userCredential);
            this.isLoading = false;
            // Redirect to dashboard or login page
            this.router.navigate(['/moviecard']); // Change route as needed
          },
          error: (error) => {
            console.error('Registration error:', error);
            this.isLoading = false;
            this.handleAuthError(error);
          }
        });
      } else {
        // Mark all fields as touched to show validation errors
        this.registerForm.markAllAsTouched();
      }
    }
  
    private handleAuthError(error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'Invalid email address.';
          break;
        case 'auth/operation-not-allowed':
          this.errorMessage = 'Email/password accounts are not enabled.';
          break;
        case 'auth/weak-password':
          this.errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        default:
          this.errorMessage = 'An error occurred during registration. Please try again.';
      }
    }

}
