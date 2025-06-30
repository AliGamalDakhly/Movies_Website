import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  firstName = '';
  lastName = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  register() {
    const fullName = this.firstName + ' ' + this.lastName;
    localStorage.setItem('username', fullName);
    this.router.navigate(['/']).then(() => {
      window.location.reload(); // علشان يظهر في الـ Navbar
    });
  }

}
