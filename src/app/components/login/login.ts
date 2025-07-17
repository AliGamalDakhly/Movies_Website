import { Component } from '@angular/core';
import { RouterLink,Router  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Adjust path as needed

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule, CommonModule
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

    // Getter methods for easy access to form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (userCredential) => {
          // console.log('Login successful:', userCredential);
          // this.isLoading = false;
          // // Redirect to dashboard or home page
          // this.router.navigate(['/navbar']); // Change route as needed

          console.log('Login successful:', userCredential);
          this.isLoading = false;

          const username = userCredential.user?.displayName || userCredential.user?.email || 'User';
          sessionStorage.setItem('username', username);

          this.router.navigate(['/']).then(() => window.location.reload());
          sessionStorage.setItem("userEmail", email);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isLoading = false;
          this.handleAuthError(error);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }
   private handleAuthError(error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
        this.errorMessage = 'No user found with this email address.';
        break;
      case 'auth/wrong-password':
        this.errorMessage = 'Incorrect password.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'Invalid email address.';
        break;
      case 'auth/user-disabled':
        this.errorMessage = 'This account has been disabled.';
        break;
      case 'auth/too-many-requests':
        this.errorMessage = 'Too many failed attempts. Please try again later.';
        break;
      default:
        this.errorMessage = 'An error occurred during login. Please try again.';
    }
  }


}
